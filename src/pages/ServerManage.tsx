import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const ServerManage = () => {
  const navigate = useNavigate();
  const [serverStatus, setServerStatus] = useState<'running' | 'stopped' | 'starting'>('stopped');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [consoleInput, setConsoleInput] = useState('');
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleLogs.length > 0) {
      consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  const startServer = () => {
    setServerStatus('starting');
    setConsoleLogs([]);
    const logs = [
      '[00:16:23 INFO] [isbxm0xx] Interface versions: Lock Auto initialized (477.4.0).',
      '[00:16:23 INFO] [vzbxm0xx] Interface versions: Lock Auto initialized (477.4.0).',
      '[00:16:23 INFO] [ScxmlxxCore] Initializing API Engine...',
      '[00:16:23 INFO] [ScxmlxxCore] API Engine v0.0.0 initialized successfully',
      '[00:16:23 INFO] [Scxmlx:Common] Config Catalog: /var/data/mods/common.toml',
      '[00:16:23 INFO] [Scxmlx:Common] Loaded system configurations. Running...',
      '[00:16:23 INFO] [Scxmlx:Common] Found 3 API connections in the config on our pre-ship provisioner.',
      '[00:16:23 INFO] [vzbxm0xx] Scanning...',
      '[00:16:23 WARN] [ScxmlxxCore] ===================================================',
      '[00:16:23 WARN] [ScxmlxxCore] Running outdated server',
      '[00:16:23 INFO] [ScxmlxxCore] Consider updating to 2.2 available',
      '[00:16:23 INFO] [ScxmlxxCore] https://github.com/BisqvitServer/MinecraftServer',
      '[00:16:23 WARN] [ScxmlxxCore] Visit our website for updates: https://bisqvit.host.ru',
      '[00:16:23 WARN] [ScxmlxxCore] ===================================================',
      '[00:16:23 INFO] [vzbxm0xx] STARTING Server version 1.0.1.NET (git-cc0ca0a)',
      '[00:16:23 INFO] [vzbxm0xx] Loading [Gateway-version] 1.8.1-v4.0.8 (git-cc0ca0a)',
      '[00:16:23 INFO] [vzbxm0xx] Enabled [Bisqvit] Server in 1100 ms',
      '[00:16:23 INFO] [vzbxm0xx] Default game type: SURVIVAL',
      '[00:16:23 INFO] [vzbxm0xx] NOTE: Server is running. Supports BunFork version 1.2.0. Download it here: https://apycore.org/download',
      '[00:16:23 INFO] [vzbxm0xx] Running 1 Bundle pack(s)',
      '[00:16:23 INFO] [vzbxm0xx] Starting server on 0.0.0.0:25565',
      '[00:16:23 INFO] [vzbxm0xx] Server started on UDP port 25565',
      '[00:16:23 INFO] [ServerUtil] Done 1 worker check (180ms)! For help, type "help"',
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setConsoleLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setServerStatus('running');
      }
    }, 18000 / logs.length);
  };

  const stopServer = () => {
    setServerStatus('stopped');
    setConsoleLogs(prev => [...prev, '[INFO] Server stopped by user']);
  };

  const restartServer = () => {
    stopServer();
    setTimeout(() => startServer(), 500);
  };

  const handleConsoleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (consoleInput.trim()) {
      setConsoleLogs(prev => [...prev, `> ${consoleInput}`]);
      setConsoleLogs(prev => [...prev, `[INFO] Command executed: ${consoleInput}`]);
      setConsoleInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <header className="bg-[#2a2a2a] border-b border-[#3a3a3a] sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-gray-400 hover:text-white">
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-3">
              <Icon name="Cookie" className="text-primary" size={32} />
              <div>
                <h1 className="text-xl font-bold text-white">Bisqvit.Host</h1>
                <p className="text-sm text-gray-400">BisqVelocity</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${serverStatus === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-400">
                {serverStatus === 'running' ? 'Online' : serverStatus === 'starting' ? 'Starting...' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar & Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#222] border-r border-[#3a3a3a] min-h-screen p-4">
          <div className="space-y-2">
            <div className="text-xs uppercase text-gray-500 px-3 py-2 font-semibold">Основное</div>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white bg-[#2a2a2a]">
              <Icon name="Terminal" className="mr-3" size={18} />
              Консоль
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="Folder" className="mr-3" size={18} />
              Файлы
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="Database" className="mr-3" size={18} />
              Базы Данных
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="Users" className="mr-3" size={18} />
              Пользователи
            </Button>
            
            <div className="text-xs uppercase text-gray-500 px-3 py-2 font-semibold mt-6">Управление</div>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="Settings" className="mr-3" size={18} />
              Настройки
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="Puzzle" className="mr-3" size={18} />
              Плагины
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="HardDrive" className="mr-3" size={18} />
              Резервные копии
            </Button>
            
            <div className="text-xs uppercase text-gray-500 px-3 py-2 font-semibold mt-6">Minecraft</div>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="Box" className="mr-3" size={18} />
              Конфигурации
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white">
              <Icon name="Layers" className="mr-3" size={18} />
              Версии
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Использование Процессора</p>
                    <p className="text-2xl font-bold text-white">0.58% <span className="text-sm text-gray-500">/ 100%</span></p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Cpu" className="text-primary" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Использование Памяти</p>
                    <p className="text-2xl font-bold text-white">706.43 MB <span className="text-sm text-gray-500">/ 2 GB</span></p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="MemoryStick" className="text-yellow-500" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Выделение / Используемое</p>
                    <p className="text-2xl font-bold text-white">174.17 MB <span className="text-sm text-gray-500">/ 2 GB</span></p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Icon name="HardDrive" className="text-blue-500" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Console */}
          <Card className="bg-[#0a0a0a] border-[#3a3a3a]">
            <div className="flex items-center justify-between p-4 border-b border-[#3a3a3a]">
              <div className="flex items-center gap-2">
                <Icon name="Terminal" className="text-primary" size={20} />
                <span className="text-white font-semibold">Консоль</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={startServer}
                  disabled={serverStatus === 'running' || serverStatus === 'starting'}
                  className="bg-green-600 hover:bg-green-700 text-white border-0"
                >
                  <Icon name="Play" className="mr-2" size={16} />
                  Старт
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={stopServer}
                  disabled={serverStatus === 'stopped'}
                  className="bg-red-600 hover:bg-red-700 text-white border-0"
                >
                  <Icon name="Square" className="mr-2" size={16} />
                  Стоп
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={restartServer}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white border-0"
                >
                  <Icon name="RotateCw" className="mr-2" size={16} />
                  Рестарт
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400">
                  <Icon name="Maximize2" size={16} />
                </Button>
              </div>
            </div>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] p-4 font-mono text-sm">
                {consoleLogs.length === 0 ? (
                  <div className="text-gray-500">Консоль пуста. Запустите сервер...</div>
                ) : (
                  consoleLogs.map((log, idx) => {
                    const isInfo = log.includes('INFO');
                    const isWarn = log.includes('WARN');
                    const isError = log.includes('ERROR');
                    
                    return (
                      <div 
                        key={idx} 
                        className={`leading-relaxed ${
                          isWarn ? 'text-yellow-400' : 
                          isError ? 'text-red-400' : 
                          isInfo ? 'text-gray-300' : 
                          'text-green-400'
                        }`}
                      >
                        {log}
                      </div>
                    );
                  })
                )}
                <div ref={consoleEndRef} />
              </ScrollArea>
              <form onSubmit={handleConsoleCommand} className="border-t border-[#3a3a3a] p-4 flex gap-2">
                <Input 
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  placeholder="Введите команду..."
                  className="flex-1 bg-[#1a1a1a] border-[#3a3a3a] text-white"
                  disabled={serverStatus !== 'running'}
                />
                <Button type="submit" disabled={serverStatus !== 'running'}>
                  <Icon name="Send" size={16} />
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ServerManage;