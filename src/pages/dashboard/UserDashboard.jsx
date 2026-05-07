import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  LayoutDashboard, ShieldAlert, FolderLock, Map, FileText, Settings,
  ChevronLeft, ChevronRight, ShieldCheck, HeartPulse, Activity, Wifi,
  Phone, AlertTriangle, CheckCircle2, Clock, Globe, Users, Lock,
  FileWarning, Send, MapPin, Bell, Menu, X
} from 'lucide-react';

// Fix for Leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to update map view when location changes
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
};

const UserDashboard = () => {
  const [sosActive, setSosActive] = useState(false);
  const [userName] = useState("Priya");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      setCameraStream(stream);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraStream(null);
  };

  useEffect(() => {
    if (sosActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [sosActive]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError(error.message);
          // Fallback to a default location (e.g., Bangalore)
          setUserLocation([12.9716, 77.5946]);
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setUserLocation([12.9716, 77.5946]);
    }
  }, []);

  const deviceConnected = true;
  const isInSafeZone = true;
  const wellnessScore = 92;
  const incidentsCount = 2;

  const emergencyContacts = [
    { name: "Mom", phone: "+91 9876543210" },
    { name: "Dad", phone: "+91 9876543211" },
    { name: "Brother", phone: "+91 9876543212" },
    { name: "Friend", phone: "+91 9876543213" },
    { name: "Emergency", phone: "112" }
  ];

  const recentSosAlerts = [
    { time: "2024-01-15 14:30", status: "Resolved" },
    { time: "2024-01-10 09:15", status: "Resolved" },
    { time: "2024-01-05 22:45", status: "Resolved" }
  ];

  const recentIncidents = [
    { id: "INC-2024-001", status: "Under Investigation" },
    { id: "INC-2024-002", status: "Closed" }
  ];

  const recentCyberComplaints = [
    { ref: "CYB-2024-001", status: "In Progress" },
    { ref: "CYB-2024-002", status: "Resolved" }
  ];

  const handleSosToggle = () => setSosActive(!sosActive);
  const handleCall = (phone) => { window.location.href = `tel:${phone}`; };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
    { to: "/sos", label: "SOS Alert", icon: ShieldAlert },
    { to: "/evidence-vault", label: "Evidence", icon: FolderLock },
    { to: "/safety-map", label: "Safety Map", icon: Map },
    { to: "/incident-report", label: "Reports", icon: FileText },
    { to: "/dashboard", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#1a0a12] to-[#050505] text-[#efece9] flex flex-col md:flex-row overflow-hidden relative">

      {/* ── Mobile Header ── */}
      <div className="md:hidden bg-[#0a0508] border-b border-[#610c27]/20 px-6 py-4 flex justify-between items-center z-50">
        <h2 className="text-xl font-bold italic text-[#e3c1b4]">Raksha</h2>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#ac9c8d] hover:text-[#e3c1b4] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Sidebar Overlay (Mobile) ── */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div className={`
        fixed inset-y-0 left-0 z-[70] md:relative md:z-auto
        ${sidebarOpen ? 'w-64' : 'w-20'} 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        bg-[#0a0508] border-r border-[#610c27]/20 transition-all duration-300 flex flex-col
      `}>
        <div className="p-6 border-b border-[#610c27]/20 hidden md:block">
          <h2 className="text-xl font-bold italic text-[#e3c1b4]">Raksha</h2>
          {sidebarOpen && <p className="text-[10px] text-[#ac9c8d] uppercase tracking-[0.3em] mt-1">Your Shield</p>}
        </div>

        {/* Mobile Sidebar Close Button */}
        <div className="p-6 border-b border-[#610c27]/20 md:hidden flex justify-between items-center">
          <h2 className="text-xl font-bold italic text-[#e3c1b4]">Raksha</h2>
          <button onClick={() => setMobileMenuOpen(false)} className="text-[#ac9c8d]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, active }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? 'bg-[#610c27]/30 text-[#e3c1b4] font-semibold border border-[#610c27]/40'
                  : 'text-[#ac9c8d] hover:bg-[#610c27]/10 hover:text-[#e3c1b4]'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={`text-sm ${!sidebarOpen && 'md:hidden'}`}>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#610c27]/20 hidden md:block">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center py-2 text-[#ac9c8d] hover:text-[#e3c1b4] transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-[#0a0508]/80 backdrop-blur-md border-b border-[#610c27]/20 px-4 md:px-8 py-6 sticky top-0 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold italic text-[#efece9]">
                Welcome, <span className="text-[#e3c1b4]">{userName}</span>
              </h1>
              <p className="text-[#ac9c8d] text-sm mt-1">Everything's looking good today</p>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-lg bg-[#1a0a12] border border-[#610c27]/20 text-[#ac9c8d] hover:text-[#e3c1b4] transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#610c27] rounded-full" />
                </button>
              </div>
              <div className="text-right">
                <p className="text-[#ac9c8d] text-[10px] uppercase tracking-[0.3em]">Last check</p>
                <p className="text-[#e3c1b4] font-semibold text-sm">Just now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">

          {/* ── Status Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Safety Status */}
            <div className="group bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6 hover:border-[#e3c1b4]/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 rounded-lg bg-[#610c27]/15">
                  <ShieldCheck className={`w-5 h-5 ${sosActive ? 'text-red-400' : 'text-emerald-400'}`} />
                </div>
                <div className={`w-2.5 h-2.5 rounded-full ${sosActive ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
              </div>
              <p className="text-[#ac9c8d] text-[10px] uppercase tracking-[0.3em] font-semibold">Safety Status</p>
              <p className={`text-3xl font-bold italic mt-1 ${sosActive ? 'text-red-400' : 'text-emerald-400'}`}>
                {sosActive ? 'Alert' : 'Safe'}
              </p>
              <p className="text-[#ac9c8d]/60 text-xs mt-2">{sosActive ? 'Alert active' : 'No active alerts'}</p>
            </div>

            {/* Wellness */}
            <div className="group bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6 hover:border-[#e3c1b4]/30 transition-all duration-300">
              <div className="p-2 rounded-lg bg-[#610c27]/15 w-fit mb-3">
                <HeartPulse className="w-5 h-5 text-[#e3c1b4]" />
              </div>
              <p className="text-[#ac9c8d] text-[10px] uppercase tracking-[0.3em] font-semibold">Wellness</p>
              <p className="text-3xl font-bold text-[#e3c1b4] mt-1">{wellnessScore}%</p>
              <p className="text-[#ac9c8d]/60 text-xs mt-2">All systems good</p>
            </div>

            {/* Recent Activity */}
            <div className="group bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6 hover:border-[#e3c1b4]/30 transition-all duration-300">
              <div className="p-2 rounded-lg bg-[#610c27]/15 w-fit mb-3">
                <Activity className="w-5 h-5 text-[#e3c1b4]" />
              </div>
              <p className="text-[#ac9c8d] text-[10px] uppercase tracking-[0.3em] font-semibold">Recent Activity</p>
              <p className="text-3xl font-bold text-[#efece9] mt-1">{incidentsCount}</p>
              <p className="text-[#ac9c8d]/60 text-xs mt-2">Reports this month</p>
            </div>

            {/* Device */}
            <div className="group bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6 hover:border-[#e3c1b4]/30 transition-all duration-300">
              <div className="p-2 rounded-lg bg-[#610c27]/15 w-fit mb-3">
                <Wifi className={`w-5 h-5 ${deviceConnected ? 'text-emerald-400' : 'text-red-400'}`} />
              </div>
              <p className="text-[#ac9c8d] text-[10px] uppercase tracking-[0.3em] font-semibold">Device</p>
              <p className={`text-3xl font-bold mt-1 ${deviceConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                {deviceConnected ? '✓' : '!'}
              </p>
              <p className="text-[#ac9c8d]/60 text-xs mt-2">{deviceConnected ? 'Connected' : 'Disconnected'}</p>
            </div>
          </div>

          {/* ── SOS + Map Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SOS Button */}
            <div className="lg:col-span-1 bg-gradient-to-br from-[#1a0a12] via-[#200e18] to-[#0f0508] border border-[#610c27]/30 rounded-2xl p-8 flex flex-col items-center justify-center">
              <p className="text-[#ac9c8d] text-[10px] uppercase tracking-[0.3em] mb-6 font-semibold">Emergency</p>
              <button
                onClick={handleSosToggle}
                className={`w-28 h-28 rounded-full text-4xl font-bold mb-6 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-105 overflow-hidden relative ${
                  sosActive
                    ? 'bg-black shadow-red-900/50 animate-pulse border-4 border-red-500'
                    : 'bg-gradient-to-br from-[#610c27] to-[#822d43] shadow-[#610c27]/40 hover:from-[#822d43] hover:to-[#a83d52]'
                }`}
              >
                {sosActive ? (
                    <video 
                      ref={(el) => {
                        if (el && cameraStream) {
                          el.srcObject = cameraStream;
                        }
                      }}
                      autoPlay 
                      muted 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover bg-black"
                    />
                  ) : (
                    <ShieldAlert className="w-10 h-10 text-white" />
                  )}
                  {sosActive && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  )}
              </button>
              <p className="text-[#ac9c8d]/60 text-xs mb-3">Tap to activate</p>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
                sosActive ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}>
                {sosActive ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                {sosActive ? 'Alert Active' : "You're Safe"}
              </div>
            </div>

            {/* Live Location Map */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#efece9] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#e3c1b4]" />
                    Your Location
                  </h3>
                  <p className="text-[#ac9c8d]/60 text-xs mt-1 ml-7">Real-time tracking</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className={`w-2 h-2 rounded-full ${isInSafeZone ? 'bg-emerald-500' : 'bg-yellow-500'}`} />
                  <span className="text-xs text-emerald-400 font-semibold">
                    {isInSafeZone ? 'Safe Zone' : 'Alert Zone'}
                  </span>
                </div>
              </div>
              <div className="aspect-video bg-[#0f0508] rounded-xl overflow-hidden border border-[#610c27]/15 relative">
                {userLocation ? (
                  <MapContainer 
                    center={userLocation} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={userLocation}>
                      <Popup>
                        You are here. <br /> {isInSafeZone ? "Safe Zone" : "Alert Zone"}
                      </Popup>
                    </Marker>
                    <RecenterMap position={userLocation} />
                  </MapContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-3">
                    <div className="w-8 h-8 border-4 border-[#610c27] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#ac9c8d] text-sm font-medium">
                      {locationError ? `Location Error: ${locationError}` : "Locating you..."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Device + Contacts Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Device Status */}
            <div className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#efece9] flex items-center gap-2 mb-5">
                <Globe className="w-5 h-5 text-[#e3c1b4]" />
                Device Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${deviceConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="text-[#efece9] font-semibold text-sm">Connection</p>
                    <p className="text-[#ac9c8d]/60 text-xs">{deviceConnected ? 'All Good' : 'Please Check'}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#610c27]/15">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#ac9c8d] font-semibold mb-3">Signal Strength</p>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((bar) => (
                      <div key={bar} className="flex-1 h-5 bg-gradient-to-t from-[#610c27] to-[#e3c1b4] rounded-sm opacity-60 hover:opacity-100 transition-opacity" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Emergency Contacts */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#efece9] flex items-center gap-2 mb-5">
                <Users className="w-5 h-5 text-[#e3c1b4]" />
                Quick Reach Out
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emergencyContacts.slice(0, 5).map((contact, index) => (
                  <div key={index} className="bg-[#0f0508] border border-[#610c27]/20 rounded-xl p-4 hover:border-[#e3c1b4]/30 transition-all">
                    <p className="text-[#efece9] font-semibold text-sm mb-1">{contact.name}</p>
                    <p className="text-[#ac9c8d]/60 text-xs mb-3">{contact.phone}</p>
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="w-full flex items-center justify-center gap-2 bg-[#610c27] hover:bg-[#822d43] px-2 py-2 rounded-lg text-xs font-semibold text-[#efece9] transition-all hover:scale-[1.02]"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Activity + Cyber Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Alerts & Incidents */}
            <div className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#efece9] flex items-center gap-2 mb-5">
                <Clock className="w-5 h-5 text-[#e3c1b4]" />
                Activity
              </h3>

              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#ac9c8d] font-semibold mb-3">Recent Alerts</p>
                <div className="space-y-2">
                  {recentSosAlerts.map((alert, index) => (
                    <div key={index} className="flex justify-between items-center bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3">
                      <span className="text-[#ac9c8d] text-sm">{alert.time}</span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Resolved
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#610c27]/15 pt-5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#ac9c8d] font-semibold mb-3">Your Reports</p>
                <div className="space-y-2">
                  {recentIncidents.map((incident, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#610c27]/5 border border-[#610c27]/15 rounded-lg p-3">
                      <span className="text-[#ac9c8d] text-sm">{incident.id}</span>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        incident.status === 'Closed'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {incident.status === 'Closed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {incident.status === 'Closed' ? 'Done' : 'In Review'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cyber Safety */}
            <div className="bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/25 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#efece9] flex items-center gap-2 mb-5">
                <Lock className="w-5 h-5 text-[#e3c1b4]" />
                Cyber Safety
              </h3>
              <div className="space-y-3 mb-5">
                {recentCyberComplaints.map((complaint, index) => (
                  <div key={index} className="bg-[#0f0508] border border-[#610c27]/20 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[#efece9] font-semibold text-sm">{complaint.ref}</p>
                        <p className="text-[#ac9c8d]/60 text-xs mt-1">Reference</p>
                      </div>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        complaint.status === 'Resolved'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                      }`}>
                        {complaint.status === 'Resolved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {complaint.status === 'Resolved' ? 'Closed' : 'Open'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/cyber-complaint" className="block">
                <button className="w-full flex items-center justify-center gap-2 bg-[#610c27] hover:bg-[#822d43] px-4 py-2.5 rounded-lg font-semibold text-[#efece9] transition-all text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-[#610c27]/20">
                  <FileWarning className="w-4 h-4" />
                  Report Something
                </button>
              </Link>
            </div>
          </div>

          {/* ── Quick Actions Footer ── */}
          <div className="bg-gradient-to-r from-[#1a0a12] via-[#200e18] to-[#1a0a12] border border-[#610c27]/25 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-[#efece9] flex items-center gap-2 mb-5">
              <Send className="w-5 h-5 text-[#e3c1b4]" />
              Quick Access
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { to: "/report-incident", icon: FileText, label: "Report" },
                { to: "/cyber-complaint", icon: Lock, label: "Cyber" },
                { to: "/evidence-vault", icon: FolderLock, label: "Vault" },
                { to: "/safety-map", icon: Map, label: "Map" },
              ].map(({ to, icon: Icon, label }) => (
                <Link key={label} to={to} className="block">
                  <button className="w-full flex items-center justify-center gap-2 bg-[#0f0508] hover:bg-[#610c27]/20 border border-[#610c27]/20 hover:border-[#e3c1b4]/30 px-4 py-3 rounded-xl font-semibold text-[#e3c1b4] transition-all text-sm">
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
