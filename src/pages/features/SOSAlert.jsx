import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, MapPin, AlertCircle, X, Send, Clock, Users, CheckCircle2, Share2, ArrowLeft } from 'lucide-react'

const SOSAlert = () => {
  const [sosActive, setSosActive] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [location, setLocation] = useState({ latitude: 12.9716, longitude: 77.5946 })
  const [alertHistory, setAlertHistory] = useState([
    {
      id: 1,
      time: '2024-01-20 14:30',
      type: 'False Alarm',
      status: 'Resolved',
      contacts: 5,
      duration: '2 mins',
    },
    {
      id: 2,
      time: '2024-01-18 19:45',
      type: 'Real Alert',
      status: 'Attended',
      contacts: 6,
      duration: '8 mins',
    },
    {
      id: 3,
      time: '2024-01-15 22:15',
      type: 'Test Alert',
      status: 'Resolved',
      contacts: 4,
      duration: '1 min',
    },
  ])

  const trustedContacts = [
    { id: 1, name: 'Mom', phone: '+91 9876543210', icon: '👩‍🦰', status: 'notified' },
    { id: 2, name: 'Dad', phone: '+91 9876543211', icon: '👨‍🦱', status: 'notified' },
    { id: 3, name: 'Sister', phone: '+91 9876543212', icon: '👧', status: 'notified' },
    { id: 4, name: 'Best Friend', phone: '+91 9876543213', icon: '👩', status: 'notified' },
    { id: 5, name: 'Neighbor', phone: '+91 9876543214', icon: '👴', status: 'pending' },
  ]

  const emergencyServices = [
    { name: 'Police', number: '100', icon: '🚔', color: 'blue' },
    { name: 'Ambulance', number: '108', icon: '🚑', color: 'red' },
    { name: 'Fire', number: '101', icon: '🚒', color: 'orange' },
    { name: 'Women Safety', number: '1091', icon: '👩‍⚕️', color: 'pink' },
  ]

  useEffect(() => {
    let timer
    if (sosActive && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [sosActive, countdown])

  const handleSOSToggle = () => {
    setSosActive(!sosActive)
    if (!sosActive) {
      setCountdown(60)
      // Add new alert to history
      const newAlert = {
        id: alertHistory.length + 1,
        time: new Date().toLocaleString(),
        type: 'Emergency Alert',
        status: 'Active',
        contacts: trustedContacts.length,
        duration: '0 secs',
      }
      setAlertHistory([newAlert, ...alertHistory])
    }
  }

  const handleCallEmergency = (number) => {
    window.location.href = `tel:${number}`
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#1a0a12] to-[#050505] text-[#efece9] overflow-x-hidden">
      {/* ── Animated Background Elements ── */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-80 h-80 bg-[#610c27]/20 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 right-10 w-96 h-96 bg-[#e3c1b4]/10 rounded-full blur-3xl"
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* ── Navigation ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#610c27]/10 border border-[#610c27]/20 text-[#e3c1b4] hover:bg-[#610c27]/20 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold uppercase tracking-wider">Back to Dashboard</span>
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-12 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div className="text-4xl md:text-5xl">🆘</div>
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-[#efece9] italic tracking-tighter">
                Emergency <span className="text-[#e3c1b4]">SOS</span>
              </h1>
              <p className="text-[#ac9c8d] text-base md:text-lg mt-2 font-light">
                One-tap emergency alert system
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Main SOS Button Section ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-3xl p-6 md:p-12 shadow-2xl text-center">
            <p className="text-[#ac9c8d] text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
              Press and Hold to Activate Emergency
            </p>

            <div className="flex flex-col items-center gap-6 md:gap-8">
              {/* SOS Button */}
              <motion.button
                onClick={handleSOSToggle}
                whileHover={!sosActive ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.98 }}
                className={`relative w-32 h-32 md:w-40 md:h-40 rounded-full text-4xl md:text-6xl font-bold transition-all duration-300 shadow-2xl flex items-center justify-center ${
                  sosActive
                    ? 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 animate-pulse'
                    : 'bg-gradient-to-br from-[#610c27] to-[#822d43] hover:from-[#822d43] hover:to-[#a83d52]'
                }`}
              >
                {sosActive ? '⚠️' : '🆘'}
                
                {/* Pulse Ring */}
                {sosActive && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-red-500"
                      animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </>
                )}
              </motion.button>

              {/* Status Text */}
              <div className="text-center">
                {sosActive ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <p className="text-red-400 text-5xl font-bold font-display">
                        {formatTime(countdown)}
                      </p>
                    </motion.div>
                    <p className="text-red-300 text-sm mt-2 uppercase tracking-widest font-semibold">
                      Alert Active
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSOSToggle}
                      className="mt-6 px-8 py-2 bg-red-600 hover:bg-red-700 text-[#efece9] rounded-lg font-semibold transition-colors"
                    >
                      Cancel Alert
                    </motion.button>
                  </>
                ) : (
                  <>
                    <p className="text-[#efece9] text-2xl font-bold font-display">Ready</p>
                    <p className="text-[#ac9c8d] text-sm mt-2">
                      Tap button to send emergency alert
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Location & Status Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Current Location */}
          <div className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-xl p-6 hover:border-[#e3c1b4]/50 transition-all">
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[#e3c1b4]" />
              <div>
                <h3 className="text-lg font-bold text-[#efece9]">Current Location</h3>
                <p className="text-[#ac9c8d] text-sm">Being shared with emergency contacts</p>
              </div>
            </div>
            <div className="bg-[#0f0508] rounded-lg p-4 text-center">
              <p className="text-[#e3c1b4] font-mono font-semibold">
                {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
              </p>
              <p className="text-[#ac9c8d] text-xs mt-2">Bangalore, Karnataka</p>
            </div>
          </div>

          {/* Alert Status */}
          <div className={`bg-gradient-to-br border rounded-xl p-6 transition-all ${
            sosActive
              ? 'from-red-900/20 to-red-800/10 border-red-500/50'
              : 'from-green-900/20 to-green-800/10 border-green-500/50'
          }`}>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className={`w-6 h-6 ${sosActive ? 'text-red-400' : 'text-green-400'}`} />
              <div>
                <h3 className="text-lg font-bold text-[#efece9]">Alert Status</h3>
                <p className={`text-sm ${sosActive ? 'text-red-300' : 'text-green-300'}`}>
                  {sosActive ? 'Emergency in progress' : 'All systems normal'}
                </p>
              </div>
            </div>
            <div className={`text-3xl font-bold font-display ${sosActive ? 'text-red-400' : 'text-green-400'}`}>
              {sosActive ? 'ALERT ACTIVE' : 'SAFE'}
            </div>
          </div>
        </motion.div>

        {/* ── Emergency Services & Contacts ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
        >
          {/* Emergency Services */}
          <div>
            <h2 className="text-2xl font-bold text-[#efece9] mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-[#e3c1b4]" />
              Emergency Services
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {emergencyServices.map(service => (
                <motion.button
                  key={service.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCallEmergency(service.number)}
                  className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-xl p-4 hover:border-[#e3c1b4]/50 transition-all group"
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <p className="font-semibold text-[#efece9] text-sm">{service.name}</p>
                  <p className="text-[#e3c1b4] font-bold mt-1">{service.number}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Trusted Contacts - Notified */}
          <div>
            <h2 className="text-2xl font-bold text-[#efece9] mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-[#e3c1b4]" />
              Trusted Contacts
            </h2>
            <div className="space-y-3">
              {trustedContacts.map(contact => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + contact.id * 0.05 }}
                  className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-lg p-4 flex items-center justify-between group hover:border-[#e3c1b4]/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <p className="font-semibold text-[#efece9]">{contact.name}</p>
                      <p className="text-[#ac9c8d] text-xs">{contact.phone}</p>
                    </div>
                  </div>
                  <motion.div
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      contact.status === 'notified'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                    }`}
                    animate={sosActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {contact.status === 'notified' ? '✓ Notified' : 'Pending'}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Alert History ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl font-bold text-[#efece9] mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-[#e3c1b4]" />
            Alert History
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {alertHistory.map((alert, idx) => (
              <motion.div
                key={alert.id}
                variants={itemVariants}
                className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-lg p-4 flex items-center justify-between hover:border-[#e3c1b4]/50 transition-all group"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`text-2xl ${alert.status === 'Active' ? 'animate-pulse' : ''}`}>
                    {alert.status === 'Active' ? '⚠️' : alert.type === 'Real Alert' ? '🚨' : '✓'}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#efece9]">{alert.type}</p>
                    <p className="text-[#ac9c8d] text-sm">{alert.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1 justify-end">
                    <Users className="w-4 h-4 text-[#e3c1b4]" />
                    <span className="text-[#efece9] font-semibold">{alert.contacts}</span>
                  </div>
                  <p className="text-[#ac9c8d] text-xs">{alert.duration}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Safety Tips ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#e3c1b4]/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-[#efece9] mb-6">Safety Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '✓ Always keep your phone charged',
              '✓ Update emergency contacts regularly',
              '✓ Enable location sharing',
              '✓ Keep trusted contacts informed',
              '✓ Test alerts in safe environment',
              '✓ Share your Live Location with contacts',
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className="text-[#ac9c8d] text-sm font-medium flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                {tip}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SOSAlert