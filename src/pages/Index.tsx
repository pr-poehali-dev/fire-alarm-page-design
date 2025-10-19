import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface SensorData {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'warning' | 'critical' | 'offline';
  temperature: number;
  smokeLevel: number;
  lastCheck: string;
}

const Index = () => {
  const [sensors, setSensors] = useState<SensorData[]>([
    {
      id: 'S001',
      name: 'Датчик дыма #1',
      location: 'Этаж 1 - Холл',
      status: 'active',
      temperature: 22,
      smokeLevel: 2,
      lastCheck: '2 мин назад'
    },
    {
      id: 'S002',
      name: 'Датчик дыма #2',
      location: 'Этаж 2 - Офис',
      status: 'active',
      temperature: 23,
      smokeLevel: 1,
      lastCheck: '1 мин назад'
    },
    {
      id: 'S003',
      name: 'Датчик дыма #3',
      location: 'Этаж 3 - Склад',
      status: 'warning',
      temperature: 28,
      smokeLevel: 15,
      lastCheck: '30 сек назад'
    },
    {
      id: 'S004',
      name: 'Датчик дыма #4',
      location: 'Подвал - Техническое помещение',
      status: 'active',
      temperature: 19,
      smokeLevel: 3,
      lastCheck: '3 мин назад'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Норма';
      case 'warning':
        return 'Предупреждение';
      case 'critical':
        return 'Критично';
      case 'offline':
        return 'Оффлайн';
      default:
        return 'Неизвестно';
    }
  };

  const activeCount = sensors.filter(s => s.status === 'active').length;
  const warningCount = sensors.filter(s => s.status === 'warning').length;
  const criticalCount = sensors.filter(s => s.status === 'critical').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(31,41,55,0.95)), url('https://cdn.poehali.dev/projects/77c48ad4-42ca-4364-8664-2e4fbfb77219/files/73211d6d-8e09-4a20-b8e7-f267a1cfd904.jpg')`
        }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Icon name="Shield" size={48} className="text-primary" />
              <h1 className="text-6xl font-bold text-white font-heading">
                FireGuard Pro
              </h1>
            </div>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              Профессиональная система пожарной безопасности с мониторингом в реальном времени
            </p>
            <div className="flex gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <Icon name="Activity" size={24} className="text-green-400" />
                  <div className="text-left">
                    <div className="text-3xl font-bold text-white">{activeCount}</div>
                    <div className="text-sm text-gray-300">Активных датчиков</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={24} className="text-yellow-400" />
                  <div className="text-left">
                    <div className="text-3xl font-bold text-white">{warningCount}</div>
                    <div className="text-sm text-gray-300">Предупреждений</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20">
                <div className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={24} className="text-red-400" />
                  <div className="text-left">
                    <div className="text-3xl font-bold text-white">{criticalCount}</div>
                    <div className="text-sm text-gray-300">Критических</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-heading">
            Онлайн-мониторинг систем
          </h2>
          <p className="text-gray-400 text-lg">
            Контроль состояния всех датчиков в режиме реального времени
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {sensors.map((sensor) => (
            <Card key={sensor.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(sensor.status)} ${sensor.status === 'warning' ? 'animate-pulse-glow' : ''}`}></div>
                    <div>
                      <CardTitle className="text-white text-xl">{sensor.name}</CardTitle>
                      <CardDescription className="text-gray-400 flex items-center gap-1 mt-1">
                        <Icon name="MapPin" size={14} />
                        {sensor.location}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={sensor.status === 'active' ? 'default' : 'destructive'}
                    className={sensor.status === 'active' ? 'bg-green-600' : sensor.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'}
                  >
                    {getStatusText(sensor.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Thermometer" size={18} className="text-blue-400" />
                      <span className="text-gray-400 text-sm">Температура</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{sensor.temperature}°C</div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Wind" size={18} className="text-gray-400" />
                      <span className="text-gray-400 text-sm">Уровень дыма</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{sensor.smokeLevel}%</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Концентрация дыма</span>
                    <span className="text-sm text-gray-400">{sensor.smokeLevel}%</span>
                  </div>
                  <Progress 
                    value={sensor.smokeLevel} 
                    className="h-2"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon name="Clock" size={14} />
                    <span>Проверено: {sensor.lastCheck}</span>
                  </div>
                  <div className="text-xs text-gray-500">ID: {sensor.id}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-3 rounded-lg">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <CardTitle className="text-white">Надёжная защита</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Круглосуточный мониторинг и мгновенное оповещение о любых угрозах пожарной безопасности
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Icon name="Wifi" size={24} className="text-blue-400" />
                </div>
                <CardTitle className="text-white">Удалённый доступ</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Контролируйте систему из любой точки мира через веб-интерфейс или мобильное приложение
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Icon name="Zap" size={24} className="text-green-400" />
                </div>
                <CardTitle className="text-white">Быстрая реакция</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Автоматическая система реагирования и интеграция с пожарными службами
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">© 2024 FireGuard Pro. Профессиональные системы пожарной безопасности</p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Icon name="Phone" size={16} />
            <span>+7 (800) 123-45-67</span>
            <span className="mx-2">•</span>
            <Icon name="Mail" size={16} />
            <span>info@fireguard.pro</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
