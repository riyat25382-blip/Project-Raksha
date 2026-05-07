import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Upload, Trash2, Eye, Download, Filter, ArrowLeft } from 'lucide-react'

const EvidenceVault = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [evidenceItems, setEvidenceItems] = useState([
    {
      id: 1,
      title: 'CCTV Footage - Incident #2024001',
      category: 'video',
      date: '2024-01-15',
      size: '2.4 GB',
      status: 'verified',
      thumbnail: '🎥',
      description: 'Security camera footage from the incident location',
    },
    {
      id: 2,
      title: 'Police Report Document',
      category: 'document',
      date: '2024-01-16',
      size: '1.2 MB',
      status: 'verified',
      thumbnail: '📄',
      description: 'Official police report and statement',
    },
    {
      id: 3,
      title: 'Medical Records',
      category: 'medical',
      date: '2024-01-17',
      size: '856 KB',
      status: 'pending',
      thumbnail: '🏥',
      description: 'Medical examination report and certificates',
    },
    {
      id: 4,
      title: 'Audio Recording - Interview',
      category: 'audio',
      date: '2024-01-18',
      size: '45 MB',
      status: 'verified',
      thumbnail: '🎙️',
      description: 'Recorded statement from witness',
    },
    {
      id: 5,
      title: 'Photographs - Scene Documentation',
      category: 'photo',
      date: '2024-01-19',
      size: '356 MB',
      status: 'verified',
      thumbnail: '📸',
      description: 'High-resolution crime scene photos',
    },
    {
      id: 6,
      title: 'Digital Forensics Report',
      category: 'document',
      date: '2024-01-20',
      size: '2.1 MB',
      status: 'pending',
      thumbnail: '🔍',
      description: 'Digital evidence analysis and findings',
    },
  ])

  const categories = [
    { id: 'all', label: 'All Evidence', icon: '📦' },
    { id: 'video', label: 'Videos', icon: '🎥' },
    { id: 'document', label: 'Documents', icon: '📄' },
    { id: 'photo', label: 'Photos', icon: '📸' },
    { id: 'audio', label: 'Audio', icon: '🎙️' },
    { id: 'medical', label: 'Medical', icon: '🏥' },
  ]

  const filteredItems = evidenceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
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

  const handleDelete = (id) => {
    setEvidenceItems(evidenceItems.filter(item => item.id !== id))
  }

  const handleView = (item) => {
    alert(`Viewing: ${item.title}\n\nSize: ${item.size}\nDate: ${item.date}\nStatus: ${item.status}`)
  }

  const handleDownload = (item) => {
    alert(`Downloading: ${item.title}`)
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
          className="mb-8 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 text-center sm:text-left">
            <div className="text-4xl md:text-5xl">🔐</div>
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-[#efece9] italic tracking-tighter">
                Evidence <span className="text-[#e3c1b4]">Vault</span>
              </h1>
              <p className="text-[#ac9c8d] text-base md:text-lg mt-2 font-light">
                Secure storage and management of case evidence
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Search and Upload Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12"
        >
          {/* Search Bar */}
          <div className="lg:col-span-2 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#ac9c8d] w-5 h-5" />
              <input
                type="text"
                placeholder="Search evidence by title, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1a0a12] border border-[#610c27]/30 rounded-xl text-[#efece9] placeholder-[#ac9c8d] focus:outline-none focus:border-[#e3c1b4] transition-all duration-300"
              />
            </div>
          </div>

          {/* Upload Button */}
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#610c27] to-[#822d43] hover:from-[#822d43] hover:to-[#610c27] text-[#efece9] px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            <Upload className="w-5 h-5" />
            Upload Evidence
          </button>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-[#e3c1b4]" />
            <h2 className="text-lg font-semibold text-[#efece9]">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#610c27] text-[#efece9] border border-[#e3c1b4] shadow-lg'
                    : 'bg-[#1a0a12] text-[#ac9c8d] border border-[#610c27]/30 hover:border-[#e3c1b4]/50'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Evidence Grid ── */}
        {filteredItems.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-2xl p-6 transition-all duration-300 hover:border-[#e3c1b4]/50 hover:shadow-2xl"
              >
                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#610c27]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{item.thumbnail}</div>
                    <motion.span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        item.status === 'verified'
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                    >
                      {item.status}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#efece9] mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#ac9c8d] text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-[#ac9c8d] mb-4">
                    <span>{item.date}</span>
                    <span className="font-semibold">{item.size}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleView(item)}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#610c27] hover:bg-[#822d43] text-[#efece9] py-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(item)}
                      className="flex items-center justify-center gap-2 bg-[#ac9c8d]/20 hover:bg-[#ac9c8d]/30 text-[#ac9c8d] px-3 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-[#efece9] mb-2">No Evidence Found</h3>
            <p className="text-[#ac9c8d]">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Upload evidence to get started'}
            </p>
          </motion.div>
        )}

        {/* ── Stats Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Items', value: evidenceItems.length, icon: '📊' },
            { label: 'Verified', value: evidenceItems.filter(i => i.status === 'verified').length, icon: '✅' },
            { label: 'Storage Used', value: '5.9 GB', icon: '💾' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden bg-gradient-to-br from-[#1a0a12] to-[#0f0508] border border-[#610c27]/30 rounded-xl p-6 transition-all duration-300 hover:border-[#e3c1b4]/50"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#610c27]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <div className="relative z-10">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-[#ac9c8d] text-sm font-semibold mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-[#e3c1b4]">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default EvidenceVault