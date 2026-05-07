import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, AlertCircle, Phone, Navigation, Eye, Heart, X, ArrowLeft } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for Leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

// Helper component to update map view when location changes
const RecenterMap = ({ position }) => {
  const map = useMap()
  useEffect(() => {
    if (position) {
      map.setView(position, 13)
    }
  }, [position, map])
  return null
}

const SafetyMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [showNearby, setShowNearby] = useState(true)
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError(error.message)
          setUserLocation([12.9716, 77.5946]) // Fallback
        }
      )
    } else {
      setLocationError("Geolocation not supported")
      setUserLocation([12.9716, 77.5946])
    }
  }, [])

  const safeLocations = [
    {
      id: 1,
      name: 'Central Police Station',
      type: 'police',
      latitude: 12.9716,
      longitude: 77.5946,
      distance: '0.5 km',
      emergency: '100',
      icon: '🚔',
      status: 'safe',
    },
    {
      id: 2,
      name: 'City Hospital',
      type: 'hospital',
      latitude: 12.9750,
      longitude: 77.5980,
      distance: '1.2 km',
      emergency: '108',
      icon: '🏥',
      status: 'safe',
    },
    {
      id: 3,
      name: 'Fire Station',
      type: 'fire',
      latitude: 12.9680,
      longitude: 77.5910,
      distance: '0.8 km',
      emergency: '101',
      icon: '🚒',
      status: 'safe',
    },
    {
      id: 4,
      name: 'Women Safety Center',
      type: 'women',
      latitude: 12.9720,
      longitude: 77.5920,
      distance: '0.3 km',
      emergency: '1091',
      icon: '👩‍⚕️',
      status: 'safe',
    },
    {
      id: 5,
      name: 'Public Park - Well Lit',
      type: 'safe_zone',
      latitude: 12.9700,
      longitude: 77.5960,
      distance: '0.6 km',
      emergency: 'N/A',
      icon: '🌳',
      status: 'safe',
    },
    {
      id: 6,
      name: 'Shopping Mall - 24/7 Security',
      type: 'public',
      latitude: 12.9740,
      longitude: 77.5900,
      distance: '1.1 km',
      emergency: 'N/A',
      icon: '🏬',
      status: 'safe',
    },
  ]

  const dangerZones = [
    {
      id: 7,
      name: 'Old Railway Area',
      type: 'alert',
      latitude: 12.9600,
      longitude: 77.5800,
      distance: '2.3 km',
      riskLevel: 'High',
      icon: '⚠️',
      status: 'danger',
      reason: 'Low lighting, isolated area',
    },
    {
      id: 8,
      name: 'Industrial Zone - Night Time',
      type: 'alert',
      latitude: 12.9550,
      longitude: 77.5850,
      distance: '2.8 km',
      riskLevel: 'Medium',
      icon: '🔴',
      status: 'danger',
      reason: 'Reduced foot traffic after 8 PM',
    },
  ]

  const recentAlerts = [
    { time: '2 hours ago', location: 'Near MG Road', type: 'Suspicious Activity', severity: 'High' },
    { time: '4 hours ago', location: 'Old Railway Area', type: 'Theft Report', severity: 'High' },
    { time: '1 day ago', location: 'Industrial Zone', type: 'Road Incident', severity: 'Medium' },
  ]

  const filteredLocations = [
    ...safeLocations,
    ...dangerZones,
  ].filter(location => {
    if (filterType === 'all') return true
    if (filterType === 'safe') return location.status === 'safe'
    if (filterType === 'danger') return location.status === 'danger'
    return true
  })

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
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
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 text-center sm:text-left">
            <div className="text-4xl md:text-5xl">🗺️</div>
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-[#efece9] italic tracking-tighter">
                Safety <span className="text-[#e3c1b4]">Map</span>
              </h1>
              <p className="text-[#ac9c8d] text-base md:text-lg mt-2 font-light">
                Real-time safety zones and emergency services near you
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Map Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="aspect-video bg-gradient-to-br from-[#1a0a12] via-[#2a1520] to-[#1a0a12] relative flex items-center justify-center">
            {/* Map Container */}
            {userLocation ? (
              <MapContainer 
                center={userLocation} 
                zoom={13} 
                style={{ height: '100%', width: '100%', zIndex: 0 }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* User Marker */}
                <Marker position={userLocation}>
                  <Popup>You are here</Popup>
                </Marker>

                {/* Filtered Locations Markers */}
                {filteredLocations.map(location => (
                  <Marker 
                    key={location.id} 
                    position={[location.latitude, location.longitude]}
                    icon={L.divIcon({
                      className: 'custom-div-icon',
                      html: `<div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${location.icon}</div>`,
                      iconSize: [30, 30],
                      iconAnchor: [15, 15]
                    })}
                  >
                    <Popup>
                      <div className="p-1">
                        <p className="font-bold">{location.name}</p>
                        <p className="text-xs">{location.type}</p>
                        {location.emergency && <p className="text-xs mt-1 text-[#610c27]">Emergency: {location.emergency}</p>}
                      </div>
                    </Popup>
                  </Marker>
                ))}

                <RecenterMap position={userLocation} />
              </MapContainer>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#e3c1b4] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[#ac9c8d] font-medium">
                  {locationError ? `Error: ${locationError}` : "Initializing Radar..."}
                </p>
              </div>
            )}

            {/* Overlay Legend */}
            <div className="absolute bottom-4 right-4 bg-[#1a0a12]/90 backdrop-blur border border-[#610c27]/50 rounded-lg p-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-lg">🟢</span>
                  <span>Safe Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 text-lg">🔴</span>
                  <span>Alert Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#e3c1b4] text-lg">📍</span>
                  <span>Your Location</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Filter & Status ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Buttons */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#efece9] mb-3">Show Locations</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'all', label: 'All Locations', icon: '📍' },
                  { id: 'safe', label: 'Safe Places', icon: '✅' },
                  { id: 'danger', label: 'Alert Zones', icon: '⚠️' },
                ].map(filter => (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterType(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      filterType === filter.id
                        ? 'bg-[#610c27] text-[#efece9] border border-[#e3c1b4] shadow-lg'
                        : 'bg-[#1a0a12] text-[#ac9c8d] border border-[#610c27]/30 hover:border-[#e3c1b4]/50'
                    }`}
                  >
                    <span className="text-xl">{filter.icon}</span>
                    {filter.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-[#ac9c8d] text-xs font-semibold uppercase">Your Status</p>
                <p className="text-green-400 font-bold">In Safe Zone</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Nearby Locations Grid ── */}
        {showNearby && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-[#efece9] mb-6">Nearby Safety Locations</h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredLocations.map(location => (
                <motion.div
                  key={location.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedLocation(location)}
                  className="group relative overflow-hidden bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-[#e3c1b4]/50 hover:shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#610c27]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{location.icon}</div>
                      <motion.span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                          location.status === 'safe'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                      >
                        {location.status === 'safe' ? 'Safe' : 'Alert'}
                      </motion.span>
                    </div>

                    <h3 className="text-base font-bold text-[#efece9] mb-2">{location.name}</h3>

                    <div className="space-y-2 text-sm text-[#ac9c8d] mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{location.distance}</span>
                      </div>
                      {location.emergency && location.emergency !== 'N/A' && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span className="font-semibold text-[#e3c1b4]">{location.emergency}</span>
                        </div>
                      )}
                    </div>

                    {location.status === 'danger' && (
                      <div className="text-xs bg-red-500/10 border border-red-500/30 rounded p-2 text-red-300 mb-3">
                        ⚠️ {location.reason}
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-[#610c27] hover:bg-[#822d43] text-[#efece9] py-2 rounded-lg font-semibold text-sm transition-colors duration-300"
                    >
                      <Navigation className="w-4 h-4 inline mr-2" />
                      Navigate
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* ── Recent Alerts Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Recent Alerts */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="w-6 h-6 text-[#e3c1b4]" />
              <h2 className="text-2xl font-bold text-[#efece9]">Recent Alerts</h2>
            </div>
            <div className="space-y-4">
              {recentAlerts.map((alert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className={`bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border rounded-lg p-4 ${
                    alert.severity === 'High'
                      ? 'border-red-500/30'
                      : 'border-yellow-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-[#efece9]">{alert.type}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      alert.severity === 'High'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-[#ac9c8d] text-sm mb-1">{alert.location}</p>
                  <p className="text-[#ac9c8d]/60 text-xs">{alert.time}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Emergency Contacts */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Phone className="w-6 h-6 text-[#e3c1b4]" />
              <h2 className="text-2xl font-bold text-[#efece9]">Emergency Hotlines</h2>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Police Emergency', number: '100', icon: '🚔' },
                { name: 'Ambulance', number: '108', icon: '🚑' },
                { name: 'Fire Emergency', number: '101', icon: '🚒' },
                { name: 'Women Safety', number: '1091', icon: '👩‍⚕️' },
              ].map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-lg p-4 flex items-center justify-between group hover:border-[#e3c1b4]/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{service.icon}</span>
                    <div>
                      <p className="text-[#efece9] font-semibold">{service.name}</p>
                      <p className="text-[#e3c1b4] font-bold">{service.number}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = `tel:${service.number}`}
                    className="bg-[#610c27] hover:bg-[#822d43] text-[#efece9] p-2 rounded-full transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Location Details Modal ── */}
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/50 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl">{selectedLocation.icon}</div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedLocation(null)}
                  className="text-[#ac9c8d] hover:text-[#efece9]"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <h3 className="text-2xl font-bold text-[#efece9] mb-2">{selectedLocation.name}</h3>
              <p className="text-[#e3c1b4] text-sm mb-4">{selectedLocation.distance} away</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-[#ac9c8d]">
                  <MapPin className="w-5 h-5" />
                  <span>Coordinates: {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}</span>
                </div>
                {selectedLocation.emergency && selectedLocation.emergency !== 'N/A' && (
                  <div className="flex items-center gap-2 text-[#e3c1b4] font-semibold">
                    <Phone className="w-5 h-5" />
                    <span>{selectedLocation.emergency}</span>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[#610c27] to-[#822d43] hover:from-[#822d43] hover:to-[#610c27] text-[#efece9] px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Navigate Here
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SafetyMap