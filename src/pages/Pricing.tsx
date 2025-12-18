import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const plans = [
    {
      id: 'start',
      name: 'Старт',
      price: '490',
      period: 'мес',
      features: ['1 сервер', '1 домен', '10 GB SSD', '100 GB трафика', 'SSL сертификат', 'Email поддержка'],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Про',
      price: '1290',
      period: 'мес',
      features: ['5 серверов', '5 доменов', '50 GB SSD', '500 GB трафика', 'SSL сертификаты', 'Приоритетная поддержка', 'Резервные копии'],
      popular: true,
    },
    {
      id: 'business',
      name: 'Бизнес',
      price: '2990',
      period: 'мес',
      features: ['Безлимит серверов', 'Безлимит доменов', '200 GB SSD', '2 TB трафика', 'SSL сертификаты', '24/7 поддержка', 'Ежедневные бэкапы', 'Dedicated IP'],
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowCheckout(true);
  };

  const handleSubscribe = () => {
    alert('Подписка успешно оформлена! Перенаправляем в личный кабинет...');
    setTimeout(() => navigate('/'), 1500);
  };

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Icon name="Cookie" className="text-primary" size={32} />
            <span className="text-2xl font-bold">Бисквит</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Назад
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-12">
        {!showCheckout ? (
          <>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Выберите тариф</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Все тарифы включают 14 дней бесплатного пробного периода
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary border-2 shadow-xl scale-105' : ''}`}>
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
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'default' : 'outline'}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      Выбрать план
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Button variant="ghost" onClick={() => setShowCheckout(false)} className="mb-6">
              <Icon name="ArrowLeft" className="mr-2" size={18} />
              Назад к тарифам
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Оформление подписки</CardTitle>
                <CardDescription>Тариф: {currentPlan?.name} — {currentPlan?.price}₽/мес</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-semibold mb-1">14 дней бесплатно</p>
                      <p className="text-sm text-muted-foreground">
                        Первые 14 дней бесплатно. Списание начнется после окончания пробного периода.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card">Номер карты</Label>
                    <Input id="card" placeholder="0000 0000 0000 0000" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Срок действия</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email для счетов</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">Сегодня</span>
                    <span className="font-semibold">0 ₽</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-muted-foreground">После {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}</span>
                    <span className="font-semibold">{currentPlan?.price} ₽/мес</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleSubscribe}>
                  <Icon name="Lock" className="mr-2" size={18} />
                  Подписаться
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Нажимая "Подписаться", вы соглашаетесь с условиями использования и политикой конфиденциальности
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;
