import { useState, useEffect, useRef } from 'react'

function Particle({ delay }: { delay: number }) {
  const [style, setStyle] = useState({})
  
  useEffect(() => {
    const left = Math.random() * 100
    const size = Math.random() * 6 + 2
    const duration = Math.random() * 10 + 8
    const opacity = Math.random() * 0.5 + 0.2
    
    setStyle({
      left: `${left}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      opacity,
    })
  }, [delay])

  return <div className="particle" style={style} />
}

function FloatingEmoji({ emoji, delay }: { emoji: string; delay: number }) {
  const [style, setStyle] = useState({})
  
  useEffect(() => {
    const left = Math.random() * 90 + 5
    const duration = Math.random() * 8 + 6
    setStyle({
      left: `${left}%`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    })
  }, [delay])

  return (
    <div className="floating-emoji" style={style}>
      {emoji}
    </div>
  )
}

function GreetingCard({ title, description, icon, color, delay }: { 
  title: string; description: string; icon: string; color: string; delay: number 
}) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`greeting-card ${visible ? 'visible' : ''}`} style={{ '--card-color': color } as React.CSSProperties}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function TypewriterText({ text, speed = 80 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index])
        setIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    }
  }, [index, text, speed])

  return (
    <span>
      {displayed}
      <span className="cursor">|</span>
    </span>
  )
}

function RippleButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setRipples(prev => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
    }
    onClick?.()
  }

  return (
    <button ref={buttonRef} className="ripple-button" onClick={handleClick}>
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </button>
  )
}

export default function App() {
  const [time, setTime] = useState(new Date())
  const [showContent, setShowContent] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    document.documentElement.className = theme === 'dark' ? 'light' : ''
  }

  const greetings = [
    { title: 'Добро пожаловать!', description: 'Рады видеть тебя здесь. Эта страница создана специально для тебя!', icon: '👋', color: '#6366f1' },
    { title: 'Исследуй', description: 'Здесь ты можешь найти вдохновение, идеи и просто хорошо провести время.', icon: '🚀', color: '#ec4899' },
    { title: 'Создавай', description: 'Каждая великая идея начинается с маленького шага. Начни прямо сейчас!', icon: '✨', color: '#14b8a6' },
    { title: 'Наслаждайся', description: 'Жизнь прекрасна, когда ты окружён красотой и гармонией.', icon: '🌈', color: '#f59e0b' },
  ]

  const emojis = ['🌟', '💫', '⭐', '🎨', '🎭', '🎪', '🦋', '🌸', '🍀', '🎵']

  const getGreeting = () => {
    const hour = time.getHours()
    if (hour < 6) return 'Доброй ночи'
    if (hour < 12) return 'Доброе утро'
    if (hour < 18) return 'Добрый день'
    return 'Добрый вечер'
  }

  return (
    <div className={`app-container ${theme}`}>
      {/* Particles */}
      <div className="particles-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Floating Emojis */}
      <div className="emojis-container">
        {emojis.map((emoji, i) => (
          <FloatingEmoji key={i} emoji={emoji} delay={i * 1.5} />
        ))}
      </div>

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* Main Content */}
      <main className={`main-content ${showContent ? 'show' : ''}`}>
        <div className="hero">
          <div className="greeting-time">{getGreeting()}, {time.toLocaleTimeString('ru-RU')}</div>
          <h1 className="main-title">
            <TypewriterText text="Привет, мир! 🌍" speed={100} />
          </h1>
          <p className="subtitle">
            Эта страница создана с любовью и вдохновением. 
            <br />Добро пожаловать в твой маленький уголок интернета!
          </p>
          
          <div className="button-group">
            <RippleButton onClick={() => setClickCount(prev => prev + 1)}>
              {clickCount === 0 ? 'Нажми меня! 🎯' : `Нажато: ${clickCount} раз(а) 🎉`}
            </RippleButton>
          </div>

          {clickCount >= 5 && (
            <div className="secret-message">
              🎊 Ты нашёл секрет! Ты очень настойчивый! 🎊
            </div>
          )}
        </div>

        <div className="cards-grid">
          {greetings.map((greeting, i) => (
            <GreetingCard
              key={i}
              title={greeting.title}
              description={greeting.description}
              icon={greeting.icon}
              color={greeting.color}
              delay={800 + i * 200}
            />
          ))}
        </div>

        <footer className="footer">
          <p>Сделано с ❤️ и React + Tailwind CSS</p>
          <p className="footer-sub">Спасибо, что заглянул! 💝</p>
        </footer>
      </main>
    </div>
  )
}
