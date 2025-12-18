import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
            <Button size="lg" className="text-lg px-8 py-6">
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

      {/* Dashboard Preview (Login Modal Content) */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsLoginOpen(false)}>
          <Card className="w-full max-w-5xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
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
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="servers">
                    <Icon name="Server" className="mr-2" size={18} />
                    Мои серверы
                  </TabsTrigger>
                  <TabsTrigger value="domains">
                    <Icon name="Globe" className="mr-2" size={18} />
                    Домены
                  </TabsTrigger>
                </TabsList>

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
                      { name: 'web-prod-01', status: 'running', cpu: '45%', ram: '2.1/4 GB', location: 'Москва' },
                      { name: 'api-server', status: 'running', cpu: '23%', ram: '1.5/2 GB', location: 'СПб' },
                      { name: 'test-server', status: 'stopped', cpu: '0%', ram: '0/1 GB', location: 'Москва' },
                    ].map((server, idx) => (
                      <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${server.status === 'running' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                              <div>
                                <div className="font-semibold text-lg">{server.name}</div>
                                <div className="text-sm text-muted-foreground">{server.location}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-8">
                              <div className="text-sm">
                                <div className="text-muted-foreground">CPU</div>
                                <div className="font-semibold">{server.cpu}</div>
                              </div>
                              <div className="text-sm">
                                <div className="text-muted-foreground">RAM</div>
                                <div className="font-semibold">{server.ram}</div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Icon name="Settings" size={16} />
                                </Button>
                                <Button size="sm" variant="outline">
                                  {server.status === 'running' ? <Icon name="Square" size={16} /> : <Icon name="Play" size={16} />}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="domains" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Мои домены</h3>
                    <Button>
                      <Icon name="Plus" className="mr-2" size={18} />
                      Добавить домен
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { domain: 'example.com', expires: '15.08.2025', ssl: true, status: 'active' },
                      { domain: 'myshop.ru', expires: '03.12.2025', ssl: true, status: 'active' },
                      { domain: 'testsite.org', expires: '22.01.2025', ssl: false, status: 'expiring' },
                    ].map((domain, idx) => (
                      <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Icon name="Globe" className="text-primary" size={24} />
                              <div>
                                <div className="font-semibold text-lg">{domain.domain}</div>
                                <div className="text-sm text-muted-foreground">Истекает: {domain.expires}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {domain.ssl ? (
                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-600">
                                  <Icon name="Lock" className="mr-1" size={12} />
                                  SSL
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-600">
                                  <Icon name="AlertCircle" className="mr-1" size={12} />
                                  Нет SSL
                                </Badge>
                              )}
                              <Badge variant={domain.status === 'active' ? 'default' : 'destructive'}>
                                {domain.status === 'active' ? 'Активен' : 'Истекает'}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <Icon name="Settings" size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
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
