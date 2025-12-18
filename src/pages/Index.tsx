import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'running' | 'stopped' | 'starting'>('stopped');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [files, setFiles] = useState([
    { name: 'index.html', size: '2.4 KB', type: 'file' },
    { name: 'styles.css', size: '1.8 KB', type: 'file' },
    { name: 'app.js', size: '5.2 KB', type: 'file' },
    { name: 'images', size: '—', type: 'folder' },
  ]);
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
      '[00:16:23] [INFO] [isbxm0xx] Interface versions: Lock Auto initialized (477.4.0).',
      '[00:16:23] [INFO] [vzbxm0xx] Interface versions: Lock Auto initialized (477.4.0).',
      '[00:16:23] [INFO] [ScxmlxxCore] Initializing API Engine...',
      '[00:16:23] [INFO] [ScxmlxxCore] API Engine v0.0.0 initialized successfully',
      '[00:16:23] [INFO] [Scxmlx:Common] Config Catalog: /var/data/mods/common.toml',
      '[00:16:23] [INFO] [Scxmlx:Common] Loaded system configurations. Running...',
      '[00:16:23] [INFO] [Scxmlx:Common] Found 3 API connections in the config on our pre-ship provisioner.',
      '[00:16:23] [INFO] [vzbxm0xx] Scanning...',
      '[00:16:23] [WARN] [ScxmlxxCore] ===================================================',
      '[00:16:23] [WARN] [ScxmlxxCore] Running outdated server',
      '[00:16:23] [INFO] [ScxmlxxCore] Consider updating to 2.2 available',
      '[00:16:23] [INFO] [ScxmlxxCore] https://github.com/BisqvitServer/MinecraftServer',
      '[00:16:23] [WARN] [ScxmlxxCore] Visit our website for updates: https://bisqvit.host.ru',
      '[00:16:23] [WARN] [ScxmlxxCore] ===================================================',
      '[00:16:23] [INFO] [vzbxm0xx] STARTING Server version 1.0.1.NET (git-cc0ca0a)',
      '[00:16:23] [INFO] [vzbxm0xx] Loading [Gateway-version] 1.8.1-v4.0.8 (git-cc0ca0a)',
      '[00:16:23] [INFO] [vzbxm0xx] Enabled [Bisqvit] Server in 1100 ms',
      '[00:16:23] [INFO] [vzbxm0xx] Default game type: SURVIVAL',
      '[00:16:23] [INFO] [vzbxm0xx] NOTE: Server is running. Supports BunFork version 1.2.0. Download it here: https://apycore.org/download',
      '[00:16:23] [INFO] [vzbxm0xx] Running 1 Bundle pack(s)',
      '[00:16:23] [INFO] [vzbxm0xx] Starting server on 0.0.0.0:25565',
      '[00:16:23] [INFO] [vzbxm0xx] Server started on UDP port 25565',
      '[00:16:23] [INFO] [ServerUtil] Done 1 worker check (180ms)! For help, type "help"',
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
    }, 150);
  };

  const stopServer = () => {
    setServerStatus('stopped');
    setConsoleLogs(prev => [...prev, '[INFO] Server stopped by user']);
  };

  const restartServer = () => {
    stopServer();
    setTimeout(() => startServer(), 500);
  };

  const deleteFile = (fileName: string) => {
    setFiles(files.filter(f => f.name !== fileName));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Cookie" className="text-primary" size={32} />
            <span className="text-2xl font-bold">Бисквит</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-primary transition-colors">Возможности</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <Button onClick={() => setIsLoginOpen(true)}>Личный кабинет</Button>
          </div>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Icon name="Menu" size={24} />
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 text-lg px-4 py-2">Современный хостинг для вашего бизнеса</Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Быстрый и надёжный хостинг
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Разворачивайте сайты за минуты. Управляйте серверами и доменами из одного места.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => { setShowRegister(true); setIsLoginOpen(true); }}>
              Начать бесплатно
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Посмотреть тарифы
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Аптайм</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Поддержка</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">Клиентов</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Возможности платформы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Всё необходимое для комфортного управления вашими проектами
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'Server', title: 'Управление серверами', desc: 'Создавайте, останавливайте и удаляйте серверы одним кликом' },
              { icon: 'Globe', title: 'Домены', desc: 'Регистрируйте домены и управляйте DNS прямо из панели' },
              { icon: 'Shield', title: 'SSL сертификаты', desc: 'Бесплатные SSL сертификаты для всех ваших доменов' },
              { icon: 'Gauge', title: 'Мониторинг', desc: 'Отслеживайте загрузку CPU, RAM и дискового пространства' },
              { icon: 'Database', title: 'Базы данных', desc: 'PostgreSQL, MySQL, MongoDB — всё под рукой' },
              { icon: 'Zap', title: 'Быстрое развёртывание', desc: 'Разворачивайте приложения за считанные секунды' },
            ].map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all hover:scale-105 hover:border-primary">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={feature.icon} className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Тарифы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите план, который подходит именно вам
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Старт',
                price: '490',
                period: 'мес',
                features: ['1 сервер', '1 домен', '10 GB SSD', '100 GB трафика', 'SSL сертификат', 'Email поддержка'],
                popular: false,
              },
              {
                name: 'Про',
                price: '1290',
                period: 'мес',
                features: ['5 серверов', '5 доменов', '50 GB SSD', '500 GB трафика', 'SSL сертификаты', 'Приоритетная поддержка', 'Резервные копии'],
                popular: true,
              },
              {
                name: 'Бизнес',
                price: '2990',
                period: 'мес',
                features: ['Безлимит серверов', 'Безлимит доменов', '200 GB SSD', '2 TB трафика', 'SSL сертификаты', '24/7 поддержка', 'Ежедневные бэкапы', 'Dedicated IP'],
                popular: false,
              },
            ].map((plan, idx) => (
              <Card key={idx} className={`relative ${plan.popular ? 'border-primary border-2 shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-4">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">₽/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary flex-shrink-0" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-xl text-muted-foreground">
              Ответы на популярные вопросы о нашем сервисе
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: 'Как быстро я могу начать работу?',
                a: 'После регистрации вы сразу получаете доступ к личному кабинету. Создание первого сервера занимает меньше минуты.',
              },
              {
                q: 'Могу ли я изменить тариф?',
                a: 'Да, вы можете в любой момент перейти на другой тариф. При апгрейде разница будет пересчитана пропорционально.',
              },
              {
                q: 'Какие способы оплаты вы принимаете?',
                a: 'Мы принимаем банковские карты, СБП, электронные кошельки и банковские переводы для юридических лиц.',
              },
              {
                q: 'Где расположены ваши серверы?',
                a: 'Наши дата-центры находятся в Москве, Санкт-Петербурге и Амстердаме. Вы можете выбрать локацию при создании сервера.',
              },
              {
                q: 'Есть ли бесплатный пробный период?',
                a: 'Да, мы предоставляем 14 дней бесплатного использования на тарифе "Старт" без привязки карты.',
              },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Dashboard / Register Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setIsLoginOpen(false); setShowRegister(false); }}>
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {showRegister ? (
              <>
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Регистрация</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setIsLoginOpen(false); setShowRegister(false); }}>
                      <Icon name="X" size={24} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">Начните бесплатно</h3>
                      <p className="text-muted-foreground">14 дней пробного периода без привязки карты</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="password">Пароль</Label>
                        <Input id="password" type="password" placeholder="Минимум 8 символов" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" type="text" placeholder="Иван Петров" className="mt-1" />
                      </div>
                      <Button className="w-full" size="lg" onClick={() => { setShowRegister(false); }}>
                        Создать аккаунт
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        Уже есть аккаунт?{' '}
                        <button className="text-primary hover:underline" onClick={() => setShowRegister(false)}>
                          Войти
                        </button>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="border-b bg-muted/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Личный кабинет</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setIsLoginOpen(false)}>
                      <Icon name="X" size={24} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Tabs defaultValue="servers" className="w-full">
                    <TabsList className="grid w-full grid-cols-5 mb-6">
                      <TabsTrigger value="servers">
                        <Icon name="Server" className="mr-2" size={18} />
                        Серверы
                      </TabsTrigger>
                      <TabsTrigger value="console">
                        <Icon name="Terminal" className="mr-2" size={18} />
                        Консоль
                      </TabsTrigger>
                      <TabsTrigger value="files">
                        <Icon name="Folder" className="mr-2" size={18} />
                        Файлы
                      </TabsTrigger>
                      <TabsTrigger value="domains">
                        <Icon name="Globe" className="mr-2" size={18} />
                        DNS
                      </TabsTrigger>
                      <TabsTrigger value="plugins">
                        <Icon name="Puzzle" className="mr-2" size={18} />
                        Плагины
                      </TabsTrigger>
                    </TabsList>

                    {/* Servers Tab */}
                    <TabsContent value="servers" className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Управление серверами</h3>
                        <Button>
                          <Icon name="Plus" className="mr-2" size={18} />
                          Создать сервер
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        {[
                          { id: 'bisqvelocity', name: 'BisqVelocity', status: 'running', cpu: '45%', ram: '2.1/4 GB', storage: '706.43 MB / 2 GB', ip: 'bisqvit.host.ru' },
                          { id: 'api-server', name: 'api-server', status: 'running', cpu: '23%', ram: '1.5/2 GB', storage: '174.17 MB / 2 GB', ip: '192.168.1.102' },
                          { id: 'test-server', name: 'test-server', status: 'stopped', cpu: '0%', ram: '0/1 GB', storage: '1.09 GB / 177.1 GB', ip: '192.168.1.103' },
                        ].map((server, idx) => (
                          <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/server/${server.id}`)}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-4">
                                  <div className={`w-3 h-3 rounded-full ${server.status === 'running' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                  <div>
                                    <div className="font-semibold text-lg">{server.name}</div>
                                    <div className="text-sm text-muted-foreground">{server.ip}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-6">
                                  <div className="text-sm">
                                    <div className="text-muted-foreground">CPU</div>
                                    <div className="font-semibold">{server.cpu}</div>
                                  </div>
                                  <div className="text-sm">
                                    <div className="text-muted-foreground">RAM</div>
                                    <div className="font-semibold">{server.ram}</div>
                                  </div>
                                  <div className="text-sm">
                                    <div className="text-muted-foreground">Диск</div>
                                    <div className="font-semibold">{server.storage}</div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Console Tab */}
                    <TabsContent value="console" className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Консоль сервера</h3>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={startServer}
                            disabled={serverStatus === 'running' || serverStatus === 'starting'}
                          >
                            <Icon name="Play" className="mr-2" size={16} />
                            Старт
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
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
                          >
                            <Icon name="RotateCw" className="mr-2" size={16} />
                            Рестарт
                          </Button>
                        </div>
                      </div>
                      <Card className="bg-black text-green-400 font-mono text-sm">
                        <CardContent className="p-4">
                          <ScrollArea className="h-[500px]">
                            {consoleLogs.length === 0 ? (
                              <div className="text-gray-500">Консоль пуста. Запустите сервер...</div>
                            ) : (
                              consoleLogs.map((log, idx) => (
                                <div key={idx} className="leading-relaxed">{log}</div>
                              ))
                            )}
                            <div ref={consoleEndRef} />
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Files Tab */}
                    <TabsContent value="files" className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Файловый менеджер</h3>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Icon name="Upload" className="mr-2" size={16} />
                            Загрузить
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="FolderPlus" className="mr-2" size={16} />
                            Новая папка
                          </Button>
                        </div>
                      </div>
                      <Card>
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {files.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-4">
                                  <Icon name={file.type === 'folder' ? 'Folder' : 'File'} className="text-primary" size={24} />
                                  <div>
                                    <div className="font-semibold">{file.name}</div>
                                    <div className="text-sm text-muted-foreground">{file.size}</div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Icon name="Eye" size={16} />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Icon name="Download" size={16} />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => deleteFile(file.name)}>
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* DNS/Domains Tab */}
                    <TabsContent value="domains" className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">DNS управление</h3>
                        <Button>
                          <Icon name="Plus" className="mr-2" size={18} />
                          Добавить запись
                        </Button>
                      </div>
                      <div className="grid gap-4">
                        {[
                          { type: 'A', name: 'bisqvit.host.ru', value: '192.168.1.100', ttl: '3600' },
                          { type: 'CNAME', name: 'www', value: 'bisqvit.host.ru', ttl: '3600' },
                          { type: 'MX', name: '@', value: 'mail.bisqvit.host.ru', ttl: '3600' },
                        ].map((record, idx) => (
                          <Card key={idx}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Badge variant="outline">{record.type}</Badge>
                                  <div>
                                    <div className="font-semibold">{record.name}</div>
                                    <div className="text-sm text-muted-foreground">{record.value}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-sm text-muted-foreground">TTL: {record.ttl}</div>
                                  <Button size="sm" variant="outline">
                                    <Icon name="Pencil" size={16} />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Plugins Tab */}
                    <TabsContent value="plugins" className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Установленные плагины</h3>
                        <Button>
                          <Icon name="Plus" className="mr-2" size={18} />
                          Установить плагин
                        </Button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { name: 'BunFork Gateway', version: '1.2.0', status: 'active', desc: 'Основной шлюз для подключения' },
                          { name: 'ScxmlCore API', version: '0.0.0', status: 'active', desc: 'API движок для сервера' },
                          { name: 'LockAuto', version: '477.4.0', status: 'active', desc: 'Система блокировок' },
                          { name: 'Common Config', version: '1.0.0', status: 'inactive', desc: 'Общие конфигурации' },
                        ].map((plugin, idx) => (
                          <Card key={idx}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-lg">{plugin.name}</CardTitle>
                                  <CardDescription>v{plugin.version}</CardDescription>
                                </div>
                                <Badge variant={plugin.status === 'active' ? 'default' : 'secondary'}>
                                  {plugin.status === 'active' ? 'Активен' : 'Неактивен'}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">{plugin.desc}</p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                  <Icon name="Settings" className="mr-2" size={14} />
                                  Настройки
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Cookie" className="text-primary" size={28} />
                <span className="text-xl font-bold">Бисквит</span>
              </div>
              <p className="text-background/70">Современный хостинг для вашего бизнеса</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">Возможности</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Документация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Статус</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/70">
            © 2024 Бисквит. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;