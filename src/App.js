import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Volume2, Trophy, Activity, Copy, ExternalLink, Zap } from 'lucide-react';

const MemeCoinTracker = () => {
  // Add your contract address here when you launch
  const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_WILL_GO_HERE";
  
  const [stats, setStats] = useState({
    totalNuts: 12,
    avgPrice: 0.000006,
    totalVolume: 2.1,
    totalExchange: 850000,
    currentValue: 6000,
    marketCap: 6000,
    holders: 8,
    priceChange24h: 0
  });

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, wallet: 'pAR...WimDF', amount: 3, type: 'buys', value: 3.2 },
    { id: 2, wallet: 'Bu6...TrMGA', amount: 2, type: 'buys', value: 2.1 },
    { id: 3, wallet: '64M...g5gQL', amount: 2, type: 'buys', value: 2.0 },
    { id: 4, wallet: '4gQ...skoJU', amount: 1, type: 'buys', value: 1.0 },
    { id: 5, wallet: 'EgF...er4M6', amount: 1, type: 'buys', value: 1.0 },
    { id: 6, wallet: '9ce...7WP6r', amount: 1, type: 'buys', value: 0.8 },
    { id: 7, wallet: '3ea...f8pG4', amount: 1, type: 'buys', value: 0.5 },
    { id: 8, wallet: 'CKU...M9fCD', amount: 1, type: 'buys', value: 0.3 },
    { id: 9, wallet: '6kd...WXawf', amount: 1, type: 'buys', value: 0.2 },
    { id: 10, wallet: 'fzf...k45dq', amount: 1, type: 'buys', value: 0.1 }
  ]);

  const [liveActivities, setLiveActivities] = useState([
    { id: 1, type: 'buy', wallet: '7xK...M9pQ', amount: "1.000", timestamp: Date.now(), nutEmoji: '🥜' },
    { id: 2, type: 'buy', wallet: 'B3n...X7qR', amount: "0.250", timestamp: Date.now() - 8000, nutEmoji: '🌰' },
    { id: 3, type: 'buy', wallet: 'F9m...L4wT', amount: "1.200", timestamp: Date.now() - 15000, nutEmoji: '🥜' },
  ]);

  const [bondingCurveProgress, setBondingCurveProgress] = useState(60);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('nuts');
  const [bubbles, setBubbles] = useState([]);

  // Simulate realistic meme coin launch behavior
  useEffect(() => {
    // Nut emojis for variety - moved inside useEffect to fix dependency warning
    const nutEmojis = ['🥜', '🌰', '🥥', '🫘'];
    
    const interval = setInterval(() => {
      // Simulate realistic market behavior
      const random = Math.random();
      const isPump = random > 0.3; // 70% chance of pump, 30% chance of sell
      
      // Update stats with realistic volatility
      setStats(prev => {
        const priceMultiplier = isPump ? 
          1 + (Math.random() * 0.15) : // 0-15% pump
          1 - (Math.random() * 0.08);  // 0-8% sell
        
        const newPrice = prev.avgPrice * priceMultiplier;
        const newMarketCap = prev.marketCap * priceMultiplier;
        const volumeIncrease = isPump ? Math.random() * 0.5 : Math.random() * 0.2;
        const priceChange = ((newPrice - prev.avgPrice) / prev.avgPrice) * 100;
        
        return {
          ...prev,
          totalNuts: prev.totalNuts + (isPump ? Math.floor(Math.random() * 2) : 0),
          avgPrice: Math.max(0.000001, newPrice),
          totalVolume: prev.totalVolume + volumeIncrease,
          totalExchange: prev.totalExchange + Math.floor(Math.random() * 50000),
          currentValue: Math.floor(newMarketCap),
          marketCap: Math.floor(newMarketCap),
          holders: prev.holders + (isPump && Math.random() > 0.8 ? 1 : 0),
          priceChange24h: prev.priceChange24h + priceChange
        };
      });

      // Add new live activity with realistic amounts
      if (Math.random() < 0.6) { // 60% chance of new activity
        const isPumpActivity = Math.random() > 0.25; // 75% buys, 25% sells
        
        let amount;
        if (isPumpActivity) {
          // Buy amounts - include some 1 SOL buys
          const buyType = Math.random();
          if (buyType < 0.15) {
            amount = (Math.random() * 0.5 + 1.0).toFixed(3); // 1.0-1.5 SOL (big buys)
          } else if (buyType < 0.25) {
            amount = "1.000"; // Exactly 1 SOL
          } else {
            amount = (Math.random() * 0.5 + 0.05).toFixed(3); // 0.05-0.55 SOL (small buys)
          }
        } else {
          // Sell amounts - smaller
          amount = (Math.random() * 0.3 + 0.02).toFixed(3); // 0.02-0.32 SOL sells
        }
        
        const newActivity = {
          id: Date.now(),
          type: isPumpActivity ? 'buy' : 'sell',
          wallet: generateRandomWallet(),
          amount: amount,
          timestamp: Date.now(),
          nutEmoji: nutEmojis[Math.floor(Math.random() * nutEmojis.length)]
        };
        
        setLiveActivities(prev => [newActivity, ...prev.slice(0, 19)]);
        
        // Create bubble for buy transactions
        if (isPumpActivity) {
          const bubble = {
            id: Date.now() + Math.random(),
            wallet: newActivity.wallet,
            amount: amount,
            emoji: newActivity.nutEmoji,
            x: Math.random() * 90, // Random horizontal position (0-90%)
            duration: 3 + Math.random() * 2, // 3-5 seconds duration
          };
          setBubbles(prev => [...prev, bubble]);
          
          // Remove bubble after animation
          setTimeout(() => {
            setBubbles(prev => prev.filter(b => b.id !== bubble.id));
          }, (bubble.duration + 1) * 1000);
        }
        
        // Update leaderboard occasionally
        if (isPumpActivity && Math.random() < 0.3) {
          setLeaderboard(prev => 
            prev.map(item => 
              Math.random() < 0.2 ? 
                { ...item, amount: item.amount + 1, value: item.value + parseFloat(amount) } : 
                item
            )
          );
        }
      }

      // Update bonding curve progress slowly
      setBondingCurveProgress(prev => Math.min(100, prev + Math.random() * 0.1));
    }, 2500); // Update every 2.5 seconds for more realistic pacing

    return () => clearInterval(interval);
  }, []); // Empty dependency array is now correct

  const generateRandomWallet = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const start = Array.from({length: 3}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const end = Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${start}...${end}`;
  };

  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const getLeaderboardData = () => {
    switch(activeTab) {
      case 'nuts':
        return leaderboard.sort((a, b) => b.amount - a.amount);
      case 'cracks':
        return leaderboard.sort((a, b) => b.value - a.value);
      case 'shells':
        return leaderboard.sort((a, b) => b.amount - a.amount).slice(0, 5);
      default:
        return leaderboard;
    }
  };

  return (
    <div className="min-h-screen bg-black text-emerald-400 font-mono p-4">
      {/* CA Address Bar */}
      <div className="border-2 border-emerald-400 mb-4 p-3 bg-emerald-900 bg-opacity-20">
        <div className="text-center">
          <span className="text-sm font-bold">CA: </span>
          {CONTRACT_ADDRESS !== "YOUR_CONTRACT_ADDRESS_WILL_GO_HERE" ? (
            <>
              <span className="text-xs ml-2 bg-emerald-400 text-black px-2 py-1 rounded font-mono">
                {CONTRACT_ADDRESS}
              </span>
              <button 
                className="ml-2 text-xs bg-emerald-400 text-black px-2 py-1 rounded hover:bg-emerald-300 flex items-center gap-1"
                onClick={() => copyToClipboard(CONTRACT_ADDRESS)}
              >
                <Copy className="w-3 h-3" />
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            </>
          ) : (
            <span className="text-xs ml-2 text-emerald-300">Contract address will appear here after launch</span>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="border-2 border-emerald-400 mb-6 p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">DeezNutsTrak™ - The Live Nuts Stat Tracker</h1>
            <div className="text-sm text-emerald-300">
              Holders: {stats.holders} | 
              <span className={`ml-2 ${stats.priceChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stats.priceChange24h >= 0 ? '↗' : '↘'} {Math.abs(stats.priceChange24h).toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="text-xl">MC: ${stats.marketCap.toLocaleString()}</div>
        </div>
        
        {/* Bonding Curve Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Bonding Curve Progress</span>
            <span>MC ${stats.marketCap.toLocaleString()}</span>
          </div>
          <div className="w-full bg-emerald-900 h-4 border border-emerald-400 relative">
            <div 
              className="bg-emerald-400 h-full transition-all duration-500"
              style={{ width: `${bondingCurveProgress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs text-black font-bold">
              {bondingCurveProgress.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border-2 border-emerald-400 p-4 text-center bg-emerald-900 bg-opacity-10">
          <div className="text-xs mb-2 flex items-center justify-center gap-1">
            <Trophy className="w-3 h-3" />
            Total Nuts
          </div>
          <div className="text-xs mb-1">Every trade is a nut to the wind</div>
          <div className="text-3xl font-bold">{stats.totalNuts}</div>
        </div>
        
        <div className="border-2 border-emerald-400 p-4 text-center bg-emerald-900 bg-opacity-10">
          <div className="text-xs mb-2 flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Avg (SOL per Nut)
          </div>
          <div className="text-xs mb-1">How much for one crunchy nut</div>
          <div className="text-3xl font-bold">{stats.avgPrice.toFixed(6)}</div>
        </div>
        
        <div className="border-2 border-emerald-400 p-4 text-center bg-emerald-900 bg-opacity-10">
          <div className="text-xs mb-2 flex items-center justify-center gap-1">
            <Volume2 className="w-3 h-3" />
            24V (Total Nut Volume)
          </div>
          <div className="text-xs mb-1">The sum of all nut exchange in SOL</div>
          <div className="text-3xl font-bold">{stats.totalVolume.toFixed(2)}</div>
        </div>
        
        <div className="border-2 border-emerald-400 p-4 text-center bg-emerald-900 bg-opacity-10">
          <div className="text-xs mb-2 flex items-center justify-center gap-1">
            <Users className="w-3 h-3" />
            VE (Total Nut Exchange)
          </div>
          <div className="text-xs mb-1">How many nuts have changed hands</div>
          <div className="text-3xl font-bold">{stats.totalExchange.toLocaleString()}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="border-2 border-emerald-400 p-4">
          <div className="mb-4">
            <h2 className="text-xl mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Leaderboard
            </h2>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 text-sm transition-colors ${activeTab === 'nuts' ? 'bg-emerald-400 text-black' : 'border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black'}`}
                onClick={() => setActiveTab('nuts')}
              >
                Nuts
              </button>
              <button 
                className={`px-3 py-1 text-sm transition-colors ${activeTab === 'cracks' ? 'bg-emerald-400 text-black' : 'border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black'}`}
                onClick={() => setActiveTab('cracks')}
              >
                Cracks
              </button>
              <button 
                className={`px-3 py-1 text-sm transition-colors ${activeTab === 'shells' ? 'bg-emerald-400 text-black' : 'border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black'}`}
                onClick={() => setActiveTab('shells')}
              >
                Shells
              </button>
            </div>
          </div>
          
          <div className="space-y-1">
            {getLeaderboardData().map((item, index) => (
              <div key={item.id} className="flex justify-between items-center py-2 text-sm border-b border-emerald-900 hover:bg-emerald-900 hover:bg-opacity-20 transition-colors">
                <div className="flex items-center">
                  <span className="w-8 text-emerald-400 font-bold">#{index + 1}</span>
                  <span className="ml-2 font-mono">{item.wallet}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400">{item.amount} {item.type}</span>
                  {activeTab === 'cracks' && (
                    <div className="text-xs text-emerald-300">{item.value.toFixed(2)} SOL</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-2 border-2 border-emerald-400 p-4">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 mr-2" />
            <h2 className="text-xl">Live Activity Feed</h2>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs">LIVE</span>
            </div>
          </div>
          
          <div className="space-y-2 h-96 overflow-y-auto">
            {liveActivities.map((activity, index) => (
              <div key={activity.id} className={`flex items-center justify-between p-3 border border-emerald-400 bg-emerald-900 bg-opacity-20 transition-all duration-300 ${index === 0 ? 'animate-pulse' : ''}`}>
                <div className="flex items-center">
                  <span className="text-xl mr-2">{activity.nutEmoji}</span>
                  <div className={`w-2 h-2 rounded-full mr-3 ${activity.type === 'buy' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-mono">{activity.wallet}</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded font-bold ${activity.type === 'buy' ? 'bg-emerald-400 text-black' : 'bg-red-400 text-black'}`}>
                    {activity.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{activity.amount} SOL</div>
                  <div className="text-xs text-emerald-300">{formatTimeAgo(activity.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Buys Section */}
      <div className="mt-6 border-2 border-emerald-400 p-4">
        <div className="flex items-center mb-4">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
          <h2 className="text-xl">Live Buys</h2>
        </div>
        
        <div className="relative overflow-hidden bg-emerald-900 bg-opacity-10 rounded border border-emerald-400 live-buys-container">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="absolute bottom-0 float-animation"
              style={{
                left: `${bubble.x}%`,
                animationDuration: `${bubble.duration}s`
              }}
            >
              <div className="bg-emerald-400 text-black px-3 py-2 rounded-full text-sm font-bold border-2 border-emerald-300 shadow-lg flex items-center gap-2">
                <span className="text-lg">{bubble.emoji}</span>
                <div>
                  <div className="font-mono">{bubble.wallet}</div>
                  <div className="text-xs">{bubble.amount} SOL</div>
                </div>
              </div>
            </div>
          ))}
          
          {bubbles.length === 0 && (
            <div className="flex items-center justify-center h-full text-emerald-300 text-sm">
              Waiting for nuts to crack... 🥜
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t-2 border-emerald-400 pt-4 flex justify-between items-center text-sm">
        <div className="text-emerald-300">
          🥜 DeezNutsTrak™ - Cracking the market one nut at a time
        </div>
        <div className="flex space-x-4">
          <a 
            href="https://pump.fun/board" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            PumpFun
          </a>
          <a 
            href="https://x.com/DeezNutsTrak" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Twitter
          </a>
          <button className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            <Zap className="w-4 h-4" />
            Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCoinTracker;