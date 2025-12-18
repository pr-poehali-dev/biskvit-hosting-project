import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  content?: string;
}

interface Plugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  enabled: boolean;
  installed: boolean;
}

const ServerManage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'console' | 'files' | 'plugins'>('console');
  const [serverStatus, setServerStatus] = useState<'running' | 'stopped' | 'starting'>('stopped');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [consoleInput, setConsoleInput] = useState('');
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cpuHistory, setCpuHistory] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [memoryHistory, setMemoryHistory] = useState<number[]>([1.84, 1.84, 1.84, 1.84, 1.84, 1.84, 1.84, 1.84, 1.84, 1.84]);
  const [diskHistory, setDiskHistory] = useState<number[]>([12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3, 12.3]);

  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'server.properties', type: 'file', size: '2.3 KB', modified: '2024-12-18 14:30', content: 'server-port=25565\nmax-players=20\ndifficulty=normal\ngamemode=survival\npvp=true' },
    { id: '2', name: 'plugins', type: 'folder', modified: '2024-12-18 12:00' },
    { id: '3', name: 'world', type: 'folder', modified: '2024-12-15 09:15' },
    { id: '4', name: 'config.yml', type: 'file', size: '1.8 KB', modified: '2024-12-17 16:45', content: 'version: 1.0\nport: 25565\nmax-connections: 100' },
    { id: '5', name: 'mods', type: 'folder', modified: '2024-12-14 11:20' },
    { id: '6', name: 'whitelist.json', type: 'file', size: '0.5 KB', modified: '2024-12-18 10:00', content: '[\n  {\n    "uuid": "abc123",\n    "name": "Player1"\n  }\n]' },
  ]);

  const [plugins, setPlugins] = useState<Plugin[]>([
    { id: '1', name: 'EssentialsX', version: '2.20.1', author: 'EssentialsX Team', description: 'Основные команды и функции для сервера', enabled: true, installed: true },
    { id: '2', name: 'WorldEdit', version: '7.2.15', author: 'sk89q', description: 'Мощный редактор мира в игре', enabled: true, installed: true },
    { id: '3', name: 'Vault', version: '1.7.3', author: 'MilkBowl', description: 'API для экономики и прав', enabled: false, installed: true },
    { id: '4', name: 'LuckPerms', version: '5.4.102', author: 'Luck', description: 'Система прав и разрешений', enabled: false, installed: false },
    { id: '5', name: 'CoreProtect', version: '21.3', author: 'Intelli', description: 'Логирование и откат изменений', enabled: false, installed: false },
  ]);

  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [showFileViewDialog, setShowFileViewDialog] = useState(false);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    if (consoleLogs.length > 0) {
      consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  useEffect(() => {
    if (serverStatus === 'running') {
      const interval = setInterval(() => {
        setCpuHistory(prev => [...prev.slice(1), Math.random() * 5 + 0.5]);
        setMemoryHistory(prev => [...prev.slice(1), Math.random() * 0.5 + 1.6]);
        setDiskHistory(prev => [...prev.slice(1), Math.random() * 0.2 + 12.2]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [serverStatus]);

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

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      setEditedContent(file.content || '');
      setShowFileDialog(true);
    }
  };

  const handleFileView = (file: FileItem) => {
    setSelectedFile(file);
    setShowFileViewDialog(true);
  };

  const handleSaveFile = () => {
    if (selectedFile) {
      setFiles(files.map(f => 
        f.id === selectedFile.id 
          ? { ...f, content: editedContent, modified: new Date().toLocaleString('ru-RU') }
          : f
      ));
      setShowFileDialog(false);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот файл?')) {
      setFiles(files.filter(f => f.id !== fileId));
    }
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      Array.from(uploadedFiles).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          const newFile: FileItem = {
            id: Date.now().toString() + Math.random(),
            name: file.name,
            type: 'file',
            size: `${(file.size / 1024).toFixed(2)} KB`,
            modified: new Date().toLocaleString('ru-RU'),
            content: content
          };
          setFiles(prev => [...prev, newFile]);
        };
        reader.readAsText(file);
      });
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FileItem = {
        id: Date.now().toString(),
        name: newFolderName,
        type: 'folder',
        modified: new Date().toLocaleString('ru-RU')
      };
      setFiles([...files, newFolder]);
      setNewFolderName('');
      setShowNewFolderDialog(false);
    }
  };

  const handleDownloadFile = (file: FileItem) => {
    const blob = new Blob([file.content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const togglePlugin = (pluginId: string) => {
    setPlugins(plugins.map(p => 
      p.id === pluginId ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const installPlugin = (pluginId: string) => {
    setPlugins(plugins.map(p => 
      p.id === pluginId ? { ...p, installed: true } : p
    ));
  };

  const uninstallPlugin = (pluginId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот плагин?')) {
      setPlugins(plugins.map(p => 
        p.id === pluginId ? { ...p, installed: false, enabled: false } : p
      ));
    }
  };

  const renderChart = (data: number[], label: string, max: number, unit: string) => {
    const maxValue = Math.max(...data, max);
    const height = 100;
    
    return (
      <div className="relative h-[100px] flex items-end gap-1">
        {data.map((value, idx) => {
          const barHeight = (value / maxValue) * height;
          return (
            <div key={idx} className="flex-1 flex flex-col justify-end">
              <div 
                className="bg-primary rounded-t transition-all duration-500"
                style={{ height: `${barHeight}px` }}
              />
            </div>
          );
        })}
        <div className="absolute top-0 left-0 text-xs text-gray-400">
          {data[data.length - 1].toFixed(2)} {unit}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleUploadFile}
      />

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

      <div className="flex">
        <aside className="w-64 bg-[#222] border-r border-[#3a3a3a] min-h-screen p-4">
          <div className="space-y-2">
            <div className="text-xs uppercase text-gray-500 px-3 py-2 font-semibold">Основное</div>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white ${activeTab === 'console' ? 'bg-[#2a2a2a]' : ''}`}
              onClick={() => setActiveTab('console')}
            >
              <Icon name="Terminal" className="mr-3" size={18} />
              Консоль
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white ${activeTab === 'files' ? 'bg-[#2a2a2a]' : ''}`}
              onClick={() => setActiveTab('files')}
            >
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
            <Button 
              variant="ghost" 
              className={`w-full justify-start text-gray-300 hover:bg-[#2a2a2a] hover:text-white ${activeTab === 'plugins' ? 'bg-[#2a2a2a]' : ''}`}
              onClick={() => setActiveTab('plugins')}
            >
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

        <main className="flex-1 p-6">
          {activeTab === 'console' && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Процессор</p>
                        <Icon name="Cpu" className="text-primary" size={20} />
                      </div>
                      <p className="text-2xl font-bold text-white mb-3">
                        {cpuHistory[cpuHistory.length - 1].toFixed(2)}% 
                        <span className="text-sm text-gray-500"> / 100%</span>
                      </p>
                    </div>
                    {renderChart(cpuHistory, 'CPU', 100, '%')}
                  </CardContent>
                </Card>

                <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Память</p>
                        <Icon name="MemoryStick" className="text-primary" size={20} />
                      </div>
                      <p className="text-2xl font-bold text-white mb-3">
                        {memoryHistory[memoryHistory.length - 1].toFixed(2)} GB 
                        <span className="text-sm text-gray-500"> / 8 GB</span>
                      </p>
                    </div>
                    {renderChart(memoryHistory, 'RAM', 8, 'GB')}
                  </CardContent>
                </Card>

                <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400">Диск</p>
                        <Icon name="HardDrive" className="text-primary" size={20} />
                      </div>
                      <p className="text-2xl font-bold text-white mb-3">
                        {diskHistory[diskHistory.length - 1].toFixed(1)} GB 
                        <span className="text-sm text-gray-500"> / 50 GB</span>
                      </p>
                    </div>
                    {renderChart(diskHistory, 'Disk', 50, 'GB')}
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#2a2a2a] border-[#3a3a3a] mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Управление Сервером</h2>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={startServer} 
                        disabled={serverStatus !== 'stopped'}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="Play" className="mr-2" size={16} />
                        Запуск
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={stopServer}
                        disabled={serverStatus === 'stopped'}
                      >
                        <Icon name="Square" className="mr-2" size={16} />
                        Стоп
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={restartServer}
                        disabled={serverStatus === 'stopped'}
                        className="border-gray-600 text-gray-300 hover:bg-[#333]"
                      >
                        <Icon name="RotateCw" className="mr-2" size={16} />
                        Перезагрузка
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Icon name="Terminal" size={20} />
                      Консоль
                    </h2>
                    <Button size="sm" variant="ghost" onClick={() => setConsoleLogs([])} className="text-gray-400 hover:text-white">
                      <Icon name="Trash2" className="mr-2" size={16} />
                      Очистить
                    </Button>
                  </div>

                  <ScrollArea className="h-[400px] bg-[#1a1a1a] rounded-lg p-4 border border-[#3a3a3a] mb-4 font-mono text-sm">
                    {consoleLogs.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Консоль пуста. Запустите сервер для просмотра логов.</p>
                    ) : (
                      <div className="space-y-1">
                        {consoleLogs.map((log, idx) => (
                          <div key={idx} className={`${
                            log.includes('WARN') ? 'text-yellow-400' : 
                            log.includes('ERROR') ? 'text-red-400' : 
                            log.includes('INFO') ? 'text-blue-400' : 
                            'text-gray-300'
                          }`}>
                            {log}
                          </div>
                        ))}
                        <div ref={consoleEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  <form onSubmit={handleConsoleCommand} className="flex gap-2">
                    <Input
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder="Введите команду..."
                      className="bg-[#1a1a1a] border-[#3a3a3a] text-white font-mono"
                      disabled={serverStatus !== 'running'}
                    />
                    <Button type="submit" disabled={serverStatus !== 'running'}>
                      <Icon name="Send" size={18} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'files' && (
            <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Icon name="Folder" size={20} />
                    Файловый менеджер
                  </h2>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                      <Icon name="Upload" className="mr-2" size={16} />
                      Загрузить
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowNewFolderDialog(true)} className="border-gray-600 text-gray-300 hover:bg-[#333]">
                      <Icon name="FolderPlus" className="mr-2" size={16} />
                      Новая папка
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-500 font-semibold border-b border-[#3a3a3a]">
                    <div className="col-span-4">Имя</div>
                    <div className="col-span-2">Размер</div>
                    <div className="col-span-3">Изменено</div>
                    <div className="col-span-3 text-right">Действия</div>
                  </div>

                  <ScrollArea className="h-[500px]">
                    {files.map((file) => (
                      <div 
                        key={file.id} 
                        className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-[#333] rounded-lg transition-colors items-center"
                      >
                        <div className="col-span-4 flex items-center gap-3">
                          <Icon 
                            name={file.type === 'folder' ? 'Folder' : 'File'} 
                            className={file.type === 'folder' ? 'text-yellow-500' : 'text-blue-400'} 
                            size={20} 
                          />
                          <span className="text-white">{file.name}</span>
                        </div>
                        <div className="col-span-2 text-gray-400 text-sm">
                          {file.size || '-'}
                        </div>
                        <div className="col-span-3 text-gray-400 text-sm">
                          {file.modified}
                        </div>
                        <div className="col-span-3 flex justify-end gap-1">
                          {file.type === 'file' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleFileView(file)}
                                className="text-gray-400 hover:text-white"
                                title="Просмотр"
                              >
                                <Icon name="Eye" size={16} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleFileClick(file)}
                                className="text-gray-400 hover:text-white"
                                title="Редактировать"
                              >
                                <Icon name="Edit" size={16} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => handleDownloadFile(file)}
                                className="text-gray-400 hover:text-white"
                                title="Скачать"
                              >
                                <Icon name="Download" size={16} />
                              </Button>
                            </>
                          )}
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDeleteFile(file.id)}
                            className="text-red-400 hover:text-red-300"
                            title="Удалить"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'plugins' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Icon name="Puzzle" size={28} />
                  Плагины
                </h2>
              </div>

              <Tabs defaultValue="installed" className="w-full">
                <TabsList className="bg-[#2a2a2a] border-[#3a3a3a]">
                  <TabsTrigger value="installed" className="data-[state=active]:bg-[#333]">
                    Установленные ({plugins.filter(p => p.installed).length})
                  </TabsTrigger>
                  <TabsTrigger value="available" className="data-[state=active]:bg-[#333]">
                    Доступные ({plugins.filter(p => !p.installed).length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="installed" className="space-y-4 mt-4">
                  {plugins.filter(p => p.installed).map((plugin) => (
                    <Card key={plugin.id} className="bg-[#2a2a2a] border-[#3a3a3a]">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-white">{plugin.name}</CardTitle>
                              <Badge variant={plugin.enabled ? 'default' : 'secondary'}>
                                {plugin.enabled ? 'Включен' : 'Выключен'}
                              </Badge>
                              <Badge variant="outline" className="text-gray-400">
                                v{plugin.version}
                              </Badge>
                            </div>
                            <CardDescription className="text-gray-400">
                              Автор: {plugin.author}
                            </CardDescription>
                            <p className="text-sm text-gray-300 mt-2">{plugin.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={plugin.enabled ? 'outline' : 'default'}
                              onClick={() => togglePlugin(plugin.id)}
                              className={plugin.enabled ? 'border-gray-600' : ''}
                            >
                              {plugin.enabled ? 'Выключить' : 'Включить'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => uninstallPlugin(plugin.id)}
                            >
                              Удалить
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="available" className="space-y-4 mt-4">
                  {plugins.filter(p => !p.installed).map((plugin) => (
                    <Card key={plugin.id} className="bg-[#2a2a2a] border-[#3a3a3a]">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-white">{plugin.name}</CardTitle>
                              <Badge variant="outline" className="text-gray-400">
                                v{plugin.version}
                              </Badge>
                            </div>
                            <CardDescription className="text-gray-400">
                              Автор: {plugin.author}
                            </CardDescription>
                            <p className="text-sm text-gray-300 mt-2">{plugin.description}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => installPlugin(plugin.id)}
                          >
                            <Icon name="Download" className="mr-2" size={16} />
                            Установить
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </main>
      </div>

      <Dialog open={showFileDialog} onOpenChange={setShowFileDialog}>
        <DialogContent className="max-w-3xl bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <DialogHeader>
            <DialogTitle>Редактирование: {selectedFile?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Внесите изменения и нажмите "Сохранить"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-[400px] bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFileDialog(false)} className="border-gray-600 text-gray-300">
              Отмена
            </Button>
            <Button onClick={handleSaveFile}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showFileViewDialog} onOpenChange={setShowFileViewDialog}>
        <DialogContent className="max-w-3xl bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <DialogHeader>
            <DialogTitle>Просмотр: {selectedFile?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Содержимое файла (только для чтения)
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <ScrollArea className="h-[400px] bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg p-4">
              <pre className="text-white font-mono text-sm whitespace-pre-wrap">
                {selectedFile?.content || 'Файл пуст'}
              </pre>
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFileViewDialog(false)} className="border-gray-600 text-gray-300">
              Закрыть
            </Button>
            <Button onClick={() => {
              setShowFileViewDialog(false);
              if (selectedFile) handleDownloadFile(selectedFile);
            }}>
              <Icon name="Download" className="mr-2" size={16} />
              Скачать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
        <DialogContent className="bg-[#2a2a2a] border-[#3a3a3a] text-white">
          <DialogHeader>
            <DialogTitle>Создать новую папку</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="folderName" className="text-gray-300">Название папки</Label>
            <Input
              id="folderName"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Введите название..."
              className="mt-2 bg-[#1a1a1a] border-[#3a3a3a] text-white"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewFolderDialog(false)} className="border-gray-600 text-gray-300">
              Отмена
            </Button>
            <Button onClick={handleCreateFolder}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServerManage;
