import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { BIKE_MODELS } from '../../data/bikesData';
import { 
  Bike, 
  Boxes, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Eye, 
  Search, 
  ShieldCheck,
  Plus,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  Pencil,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react';

export default function Dashboard({ testRides = [], products = [] }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [rideSearch, setRideSearch] = useState('');
  const [rideStatusFilter, setRideStatusFilter] = useState('all');
  const [selectedRideModal, setSelectedRideModal] = useState(null);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Modal State: Admin Manual Booking Creation
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    city: 'Kathmandu',
    model_id: products.length > 0 ? (products[0].slug || products[0].id) : BIKE_MODELS[0].id,
    ride_date: new Date().toISOString().split('T')[0],
    need_finance: false,
    status: 'Pending',
  });

  // Modal State: Admin Product Creation
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productFormData, setProductFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    category: 'Neo-Retro (Django)',
    category_key: 'django',
    price_npr: 370000,
    engine: '125 cc EasyMotion EURO-5 EFI',
    power: '10.6 HP @ 8,000 RPM',
    torque: '9.3 Nm @ 6,500 RPM',
    top_speed: '95 km/h',
    fuel_system: 'EFI (Electronic Fuel Injection)',
    braking: 'ABS Front Disc & Rear SBC',
    warranty: '3 Years / 30,000 KM',
    mileage: '45 km/L',
    badge: 'Popular in Kathmandu',
    description: '',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
    image_file: null,
  });
  const [newImagePreview, setNewImagePreview] = useState(null);

  // Modal State: Admin Product Edit
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    category: 'Neo-Retro (Django)',
    category_key: 'django',
    price_npr: 370000,
    engine: '',
    power: '',
    torque: '',
    top_speed: '',
    fuel_system: '',
    braking: '',
    warranty: '',
    mileage: '',
    badge: '',
    description: '',
    image: '',
    image_file: null,
    colors: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  const activeBikeList = products && products.length > 0 ? products : BIKE_MODELS;

  const getBikeName = (modelId) => {
    const bike = activeBikeList.find(b => (b.id === modelId || b.slug === modelId || b.name === modelId));
    return bike ? bike.name : modelId;
  };

  // Helper stats
  const totalRides = testRides.length;
  const pendingRides = testRides.filter(r => r.status === 'Pending' || r.status === 'pending').length;
  const confirmedRides = testRides.filter(r => r.status === 'Confirmed' || r.status === 'confirmed').length;

  // Filtered Ride Requests
  const filteredRides = testRides.filter(ride => {
    const matchesSearch = 
      ride.full_name?.toLowerCase().includes(rideSearch.toLowerCase()) ||
      ride.phone?.includes(rideSearch) ||
      ride.email?.toLowerCase().includes(rideSearch.toLowerCase()) ||
      ride.model_id?.toLowerCase().includes(rideSearch.toLowerCase());

    const matchesStatus = rideStatusFilter === 'all' || ride.status === rideStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Action: Create Manual Booking by Admin
  const handleCreateBookingSubmit = (e) => {
    e.preventDefault();
    router.post('/admin/test-rides', bookingFormData, {
      preserveScroll: true,
      onSuccess: () => {
        setIsAddBookingOpen(false);
        setBookingFormData({
          full_name: '',
          phone: '',
          email: '',
          city: 'Kathmandu',
          model_id: activeBikeList[0]?.slug || activeBikeList[0]?.id || 'django-125-classic',
          ride_date: new Date().toISOString().split('T')[0],
          need_finance: false,
          status: 'Pending',
        });
      }
    });
  };

  // Action: Create Product by Admin
  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(productFormData).forEach(key => {
      if (key === 'image_file' && productFormData.image_file) {
        data.append('image_file', productFormData.image_file);
      } else if (productFormData[key] !== null && productFormData[key] !== undefined) {
        data.append(key, productFormData[key]);
      }
    });

    router.post('/admin/products', data, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsAddProductOpen(false);
        setNewImagePreview(null);
      }
    });
  };

  // Action: Open Edit Product Modal
  const handleOpenEditProduct = (bike) => {
    setEditingProduct(bike);
    const existingColors = bike.colors && bike.colors.length > 0
      ? bike.colors.map(c => ({
          id: c.id,
          color_name: c.color_name || c.name || 'Color Variant',
          hex_code: c.hex_code || c.hex || '#00205B',
          accent_hex: c.accent_hex || c.accentHex || '#00A3FF',
          image_url: c.image_url || c.previewUrl || bike.image || ''
        }))
      : [
          { color_name: 'Factory Finish', hex_code: '#00205B', accent_hex: '#00A3FF', image_url: bike.image || '' }
        ];

    setEditFormData({
      name: bike.name || '',
      slug: bike.slug || '',
      tagline: bike.tagline || '',
      category: bike.category || 'Neo-Retro (Django)',
      category_key: bike.category_key || bike.categoryKey || 'django',
      price_npr: bike.price_npr || bike.priceNPR || 370000,
      engine: bike.engine || '',
      power: bike.power || '',
      torque: bike.torque || '',
      top_speed: bike.top_speed || bike.topSpeed || '',
      fuel_system: bike.fuel_system || bike.fuelSystem || '',
      braking: bike.braking || '',
      warranty: bike.warranty || '3 Years / 30,000 KM',
      mileage: bike.mileage || '',
      badge: bike.badge || '',
      description: bike.description || '',
      image: bike.image || bike.transparentCutout || '',
      image_file: null,
      colors: existingColors,
    });
    setImagePreview(bike.image || bike.transparentCutout || null);
    setIsEditProductOpen(true);
  };

  const handleEditImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormData(prev => ({ ...prev, image_file: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleColorChange = (index, field, value) => {
    setEditFormData(prev => {
      const nextColors = [...prev.colors];
      nextColors[index] = { ...nextColors[index], [field]: value };
      return { ...prev, colors: nextColors };
    });
  };

  const handleAddColor = () => {
    setEditFormData(prev => ({
      ...prev,
      colors: [
        ...prev.colors,
        { color_name: 'New Colorway', hex_code: '#1E293B', accent_hex: '#00A3FF', image_url: editFormData.image || '' }
      ]
    }));
  };

  const handleRemoveColor = (index) => {
    setEditFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  // Action: Submit Updated Product
  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSavingProduct(true);

    const data = new FormData();
    data.append('name', editFormData.name);
    data.append('slug', editFormData.slug);
    data.append('tagline', editFormData.tagline || '');
    data.append('category', editFormData.category);
    data.append('category_key', editFormData.category_key);
    data.append('price_npr', editFormData.price_npr);
    data.append('engine', editFormData.engine || '');
    data.append('power', editFormData.power || '');
    data.append('torque', editFormData.torque || '');
    data.append('top_speed', editFormData.top_speed || '');
    data.append('fuel_system', editFormData.fuel_system || '');
    data.append('braking', editFormData.braking || '');
    data.append('warranty', editFormData.warranty || '');
    data.append('mileage', editFormData.mileage || '');
    data.append('badge', editFormData.badge || '');
    data.append('description', editFormData.description || '');
    data.append('image', editFormData.image || '');
    if (editFormData.image_file) {
      data.append('image_file', editFormData.image_file);
    }
    data.append('colors', JSON.stringify(editFormData.colors));

    router.post(`/admin/products/${editingProduct.id}`, data, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsSavingProduct(false);
        setIsEditProductOpen(false);
        setEditingProduct(null);
        setImagePreview(null);
      },
      onError: () => {
        setIsSavingProduct(false);
      }
    });
  };

  // Action: Delete Product
  const handleDeleteProduct = (bike) => {
    if (confirm(`Are you sure you want to delete "${bike.name}" from the product database? This cannot be undone.`)) {
      router.delete(`/admin/products/${bike.id}`, {
        preserveScroll: true
      });
    }
  };

  // Action: Update Test Ride Status
  const handleUpdateRideStatus = (id, newStatus) => {
    router.post(`/admin/test-rides/${id}/status`, { status: newStatus }, {
      preserveScroll: true,
      onSuccess: () => {
        if (selectedRideModal && selectedRideModal.id === id) {
          setSelectedRideModal(prev => ({ ...prev, status: newStatus }));
        }
      }
    });
  };

  // Action: Delete Test Ride
  const handleDeleteRide = (id) => {
    if (confirm('Are you sure you want to delete this booking request?')) {
      router.delete(`/admin/test-rides/${id}`, {
        preserveScroll: true,
        onSuccess: () => setSelectedRideModal(null)
      });
    }
  };

  // Status Badge Component
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">Confirmed</span>;
      case 'Completed':
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">Completed</span>;
      case 'Cancelled':
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-rose-950/80 text-rose-300 border border-rose-500/30">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-950/80 text-amber-300 border border-amber-500/30">Pending</span>;
    }
  };

  return (
    <AdminLayout 
      activeTab={activeTab} 
      onSelectTab={(tab) => setActiveTab(tab)}
      testRides={testRides}
      products={products}
    >
      <Head title="Admin Dashboard" />

      <div className="space-y-8">
        
        {/* Page Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#00205B]/80 via-[#0B132B] to-[#090B10] p-6 rounded-3xl border border-cyan-500/30 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Peugeot Motocycles Nepal Admin</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              {activeTab === 'overview' && 'Executive Operations Dashboard'}
              {activeTab === 'rides' && 'Product & Test Ride Bookings'}
              {activeTab === 'products' && 'Peugeot Vehicle Catalog & Specifications'}
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Manage customer reservations, store bookings, and update Peugeot Nepal motorcycle specifications.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddBookingOpen(true)}
              className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Booking</span>
            </button>

            {['overview', 'rides', 'products'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeTab === tab 
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold' 
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 1. STATISTICS CARDS OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Card 1: Total Ride Requests */}
          <div 
            onClick={() => setActiveTab('rides')}
            className="cursor-pointer glass-panel bg-slate-900/90 hover:bg-slate-800/90 rounded-2xl p-5 border border-slate-800 transition-all hover:scale-[1.02] shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Total Customer Bookings</span>
              <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                <Bike className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-extrabold text-white">{totalRides}</span>
              {pendingRides > 0 && (
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
                  {pendingRides} Pending
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{confirmedRides} Confirmed Reservations</span>
            </div>
          </div>

          {/* Card 2: Active Peugeot Range */}
          <div 
            onClick={() => setActiveTab('products')}
            className="cursor-pointer glass-panel bg-slate-900/90 hover:bg-slate-800/90 rounded-2xl p-5 border border-slate-800 transition-all hover:scale-[1.02] shadow-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Nepal Vehicle Lineup</span>
              <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <Boxes className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-heading font-extrabold text-white">{activeBikeList.length}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                EURO-5 EFI
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Django, Speedfight, XP400 & Tweet models
            </div>
          </div>

          {/* Card 3: Operations SLA & Store Hours */}
          <div className="glass-panel bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Kathmandu Flagship</span>
              <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-500/30">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading font-bold text-cyan-300">Durbar Marg Store</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Sun – Fri: 10:00 AM – 6:00 PM
            </div>
          </div>

        </div>

        {/* 2. OVERVIEW / RIDE BOOKINGS TAB */}
        {(activeTab === 'overview' || activeTab === 'rides') && (
          <div className="bg-[#0B132B] rounded-2xl border border-slate-800 shadow-xl overflow-hidden space-y-4">
            
            {/* Header & Controls Bar */}
            <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <Bike className="w-5 h-5 text-cyan-400" />
                  <span>Customer Bookings & Test Ride Requests</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full">
                    {filteredRides.length} Total
                  </span>
                </h3>
              </div>

              {/* Add Booking + Search & Filters */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setIsAddBookingOpen(true)}
                  className="px-3.5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-cyan-600 hover:bg-cyan-500 border border-cyan-400/40 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Booking</span>
                </button>

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, model..."
                    value={rideSearch}
                    onChange={(e) => setRideSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl pl-9 pr-3 py-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <select
                  value={rideStatusFilter}
                  onChange={(e) => setRideStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-white text-xs rounded-xl px-3 py-2.5 focus:border-cyan-400 focus:outline-none font-semibold cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Test Rides / Bookings Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800/80">
                <thead className="bg-slate-950/80">
                  <tr>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Info</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Model Requested</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Booking Date</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3.5 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-slate-800/50 text-xs">
                  {filteredRides && filteredRides.length > 0 ? filteredRides.map((ride) => (
                    <tr key={ride.id} className="hover:bg-slate-900/50 transition-colors">
                      
                      {/* Created Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-medium">
                        {new Date(ride.created_at).toLocaleDateString()}
                      </td>

                      {/* Customer Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-white text-sm">{ride.full_name}</div>
                        <div className="text-slate-400">{ride.phone} • {ride.city || 'Kathmandu'}</div>
                        <div className="text-slate-500 text-[11px]">{ride.email}</div>
                      </td>

                      {/* Model Requested */}
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                        <div>{getBikeName(ride.model_id)}</div>
                        {ride.need_finance ? (
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-cyan-950/80 text-cyan-300 rounded border border-cyan-500/30">
                            Requires EMI Loan
                          </span>
                        ) : null}
                      </td>

                      {/* Ride Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-cyan-300 font-bold">
                        {ride.ride_date}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStatusBadge(ride.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        <select
                          value={ride.status}
                          onChange={(e) => handleUpdateRideStatus(ride.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:border-cyan-400 focus:outline-none font-semibold cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirm Slot</option>
                          <option value="Completed">Mark Completed</option>
                          <option value="Cancelled">Cancel</option>
                        </select>

                        <button
                          onClick={() => setSelectedRideModal(ride)}
                          className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 hover:bg-slate-800 border border-slate-700 transition-all inline-flex items-center cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteRide(ride.id)}
                          className="p-1.5 rounded-lg bg-slate-900 text-rose-400 hover:bg-rose-950/50 border border-slate-700 transition-all inline-flex items-center cursor-pointer"
                          title="Delete Request"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-slate-400">
                        No customer bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* 3. PRODUCTS & SPECIFICATIONS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B132B] p-5 rounded-2xl border border-slate-800">
              <div>
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-cyan-400" />
                  <span>Nepal Vehicle Catalog & Colorway Variants</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Official Peugeot Motocycles range imported in Nepal with ex-showroom prices in NPR.
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 flex items-center gap-2 shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product / Model</span>
              </button>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeBikeList.map((bike) => {
                const colors = bike.colors && bike.colors.length > 0 ? bike.colors : [
                  { color_name: 'Default', hex_code: '#00205B', hex: '#00205B' }
                ];
                const priceNpr = bike.price_npr || bike.priceNPR || 370000;

                return (
                  <div 
                    key={bike.id || bike.slug}
                    className="bg-[#0B132B] rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all shadow-xl"
                  >
                    <div>
                      {/* Category & Price Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-[#00205B] text-cyan-300 border border-cyan-500/30">
                          {bike.category}
                        </span>
                        <span className="text-xs font-extrabold text-cyan-400">
                          NPR {Number(priceNpr).toLocaleString('en-NP')}
                        </span>
                      </div>

                      {/* Image */}
                      <div className="relative h-48 w-full flex items-center justify-center my-3 bg-slate-950/60 rounded-2xl border border-slate-900 p-2">
                        <img
                          src={bike.image || bike.transparentCutout}
                          alt={bike.name}
                          className="max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                        />
                      </div>

                      <h4 className="text-xl font-heading font-bold text-white">{bike.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{bike.tagline || bike.description}</p>

                      {/* Color Swatch Dots */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Factory Color Variants ({colors.length}):
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          {colors.map((c, i) => (
                            <div key={i} className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                              <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: c.hex_code || c.hex }} />
                              <span className="text-[10px] text-slate-300 font-medium">{(c.color_name || c.name || '').split(' ')[0]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-400 truncate">{bike.warranty || '3 Years Warranty'}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setSelectedProductModal(bike)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                          title="Inspect Technical Specs"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="hidden xl:inline">Specs</span>
                        </button>
                        <button
                          onClick={() => handleOpenEditProduct(bike)}
                          className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00205B] to-[#0055A5] hover:to-[#00A3FF] text-white border border-cyan-500/40 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md hover:scale-105 transition-all"
                          title="Edit Details, Specs & Images"
                        >
                          <Pencil className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Edit</span>
                        </button>
                        {bike.id && (
                          <button
                            onClick={() => handleDeleteProduct(bike)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-white border border-rose-800/40 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: ADD MANUAL BOOKING BY ADMIN */}
      {isAddBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-heading font-bold text-lg text-white">Add Customer Product Booking</span>
              <button onClick={() => setIsAddBookingOpen(false)} className="p-1 rounded-full bg-slate-900 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBookingSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Thapa"
                  value={bookingFormData.full_name}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, full_name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Mobile (+977) *</label>
                  <input
                    type="text"
                    required
                    placeholder="98XXXXXXXX"
                    value={bookingFormData.phone}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="customer@example.com"
                    value={bookingFormData.email}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">City / Location</label>
                  <input
                    type="text"
                    value={bookingFormData.city}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Vehicle Model</label>
                  <select
                    value={bookingFormData.model_id}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, model_id: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  >
                    {activeBikeList.map((b) => (
                      <option key={b.id || b.slug} value={b.slug || b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Booking Date</label>
                  <input
                    type="date"
                    value={bookingFormData.ride_date}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, ride_date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Status</label>
                  <select
                    value={bookingFormData.status}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 cursor-pointer"
              >
                Save Booking to Database
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW PRODUCT BY ADMIN */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-heading font-bold text-lg text-white">Add New Peugeot Motorcycle Model</span>
              <button onClick={() => setIsAddProductOpen(false)} className="p-1 rounded-full bg-slate-900 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Model Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Peugeot Pulsion 125 Allure"
                  value={productFormData.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setProductFormData({ ...productFormData, name: val, slug });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Category</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const catKey = cat.includes('Django') ? 'django' : cat.includes('Speedfight') ? 'speedfight' : 'xp400';
                      setProductFormData({ ...productFormData, category: cat, category_key: catKey });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Neo-Retro (Django)">Neo-Retro (Django)</option>
                    <option value="Sport / Street (Speedfight)">Sport / Street (Speedfight)</option>
                    <option value="Maxi / Adventure (XP400 / Tweet)">Maxi / Adventure (XP400 / Tweet)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Price in NPR *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.price_npr}
                    onChange={(e) => setProductFormData({ ...productFormData, price_npr: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Engine</label>
                  <input
                    type="text"
                    value={productFormData.engine}
                    onChange={(e) => setProductFormData({ ...productFormData, engine: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Power</label>
                  <input
                    type="text"
                    value={productFormData.power}
                    onChange={(e) => setProductFormData({ ...productFormData, power: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Input & Preview for New Product */}
              <div className="space-y-2 pt-1 border-t border-slate-800">
                <label className="text-slate-300 font-semibold block">Vehicle Image (URL or File Upload)</label>
                
                {newImagePreview && (
                  <div className="relative h-32 w-full flex items-center justify-center bg-slate-900 rounded-xl border border-slate-800 p-2 overflow-hidden mb-2">
                    <img src={newImagePreview} alt="Preview" className="max-h-full object-contain" />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Paste Image URL"
                    value={productFormData.image}
                    onChange={(e) => {
                      const url = e.target.value;
                      setProductFormData({ ...productFormData, image: url, image_file: null });
                      setNewImagePreview(url);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />

                  <label className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-dashed border-cyan-500/40 text-cyan-300 rounded-xl p-2.5 cursor-pointer font-semibold">
                    <Upload className="w-3.5 h-3.5" />
                    <span className="truncate">{productFormData.image_file ? productFormData.image_file.name : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setProductFormData({ ...productFormData, image_file: file });
                          setNewImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Tagline / Brief Description</label>
                <textarea
                  rows="2"
                  value={productFormData.description}
                  onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] to-[#00A3FF] border border-cyan-400/40 hover:from-[#003380] hover:to-[#00B4FF] shadow-lg cursor-pointer transition-all"
              >
                Save Product to Database
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RIDE DETAILS VIEW MODAL */}
      {selectedRideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-heading font-bold text-lg text-white">Booking Details</span>
              <button onClick={() => setSelectedRideModal(null)} className="p-1 rounded-full bg-slate-900 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-bold text-white text-sm">{selectedRideModal.full_name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Mobile Number:</span>
                <span className="font-bold text-cyan-300">{selectedRideModal.phone}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Email Address:</span>
                <span className="font-bold text-slate-200">{selectedRideModal.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">City / District:</span>
                <span className="font-bold text-white">{selectedRideModal.city || 'Kathmandu'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Requested Model:</span>
                <span className="font-bold text-cyan-400">{getBikeName(selectedRideModal.model_id)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Booking Date:</span>
                <span className="font-bold text-amber-300">{selectedRideModal.ride_date}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Current Status:</span>
                <div>{renderStatusBadge(selectedRideModal.status)}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Update Status:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleUpdateRideStatus(selectedRideModal.id, 'Confirmed')}
                  className="py-2 rounded-xl text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleUpdateRideStatus(selectedRideModal.id, 'Completed')}
                  className="py-2 rounded-xl text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900 cursor-pointer"
                >
                  Completed
                </button>
                <button
                  onClick={() => handleUpdateRideStatus(selectedRideModal.id, 'Cancelled')}
                  className="py-2 rounded-xl text-xs font-bold bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT INSPECT MODAL */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0B132B] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-heading font-bold text-lg text-white">{selectedProductModal.name} Specifications</span>
              <button onClick={() => setSelectedProductModal(null)} className="p-1 rounded-full bg-slate-900 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Price (NPR)</span>
                <span className="font-extrabold text-cyan-400 text-base">
                  NPR {Number(selectedProductModal.price_npr || selectedProductModal.priceNPR || 370000).toLocaleString('en-NP')}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Engine</span>
                <span className="font-bold text-white text-xs">{selectedProductModal.engine}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-slate-400 block">Description:</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                {selectedProductModal.description || selectedProductModal.tagline}
              </p>
            </div>

            <button
              onClick={() => setSelectedProductModal(null)}
              className="w-full py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT DETAILS & IMAGES */}
      {isEditProductOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0B132B] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  <Pencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-white">Edit Vehicle: {editingProduct.name}</h3>
                  <p className="text-xs text-slate-400">Update specifications, NPR ex-showroom price, colorways, and images.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditProductOpen(false)} 
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-6 text-xs">
              
              {/* SECTION 1: VEHICLE HERO IMAGE & MEDIA */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span>Product Image & Visual Assets</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Preview Updates Instantly</span>
                </div>

                {/* Live Image Preview */}
                <div className="relative h-52 w-full flex items-center justify-center bg-slate-900/90 rounded-2xl border border-slate-800 p-4 overflow-hidden group">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Product Preview" 
                      className="max-h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform" 
                    />
                  ) : (
                    <div className="text-slate-500 flex flex-col items-center gap-2">
                      <ImageIcon className="w-10 h-10 stroke-1" />
                      <span>No image selected</span>
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-[#00205B]/90 text-cyan-300 border border-cyan-500/30">
                    Live Preview
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Image URL */}
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Image URL (Web Link)</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={editFormData.image}
                      onChange={(e) => {
                        const url = e.target.value;
                        setEditFormData({ ...editFormData, image: url, image_file: null });
                        setImagePreview(url);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* Direct File Upload */}
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">OR Upload New Image File</label>
                    <label className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-dashed border-cyan-500/50 hover:border-cyan-400 text-cyan-300 rounded-xl p-2.5 cursor-pointer transition-colors font-semibold">
                      <Upload className="w-4 h-4" />
                      <span>{editFormData.image_file ? editFormData.image_file.name : 'Choose File from Computer'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION 2: BASIC PRODUCT DETAILS */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="font-bold text-sm text-cyan-300 block">General Information & Pricing</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Vehicle Name *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">URL Identifier (Slug) *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.slug}
                      onChange={(e) => setEditFormData({ ...editFormData, slug: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Category *</label>
                    <select
                      value={editFormData.category}
                      onChange={(e) => {
                        const cat = e.target.value;
                        const catKey = cat.includes('Django') ? 'django' : cat.includes('Speedfight') ? 'speedfight' : 'xp400';
                        setEditFormData({ ...editFormData, category: cat, category_key: catKey });
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Neo-Retro (Django)">Neo-Retro (Django)</option>
                      <option value="Sport / Street (Speedfight)">Sport / Street (Speedfight)</option>
                      <option value="Maxi / Adventure (XP400 / Tweet)">Maxi / Adventure (XP400 / Tweet)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Price in NPR *</label>
                    <input
                      type="number"
                      required
                      value={editFormData.price_npr}
                      onChange={(e) => setEditFormData({ ...editFormData, price_npr: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Promotional Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Most Popular in Kathmandu"
                      value={editFormData.badge}
                      onChange={(e) => setEditFormData({ ...editFormData, badge: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Tagline / Slogan</label>
                  <input
                    type="text"
                    placeholder="e.g. Born from 1898 Motorsports Heritage"
                    value={editFormData.tagline}
                    onChange={(e) => setEditFormData({ ...editFormData, tagline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* SECTION 3: TECHNICAL SPECIFICATIONS */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="font-bold text-sm text-cyan-300 block">Powertrain & Mechanical Specifications</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Engine</label>
                    <input
                      type="text"
                      placeholder="125 cc EURO-5 EFI"
                      value={editFormData.engine}
                      onChange={(e) => setEditFormData({ ...editFormData, engine: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Max Power</label>
                    <input
                      type="text"
                      placeholder="10.6 HP @ 8,000 RPM"
                      value={editFormData.power}
                      onChange={(e) => setEditFormData({ ...editFormData, power: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Max Torque</label>
                    <input
                      type="text"
                      placeholder="9.3 Nm @ 6,500 RPM"
                      value={editFormData.torque}
                      onChange={(e) => setEditFormData({ ...editFormData, torque: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Top Speed</label>
                    <input
                      type="text"
                      placeholder="95 km/h"
                      value={editFormData.top_speed}
                      onChange={(e) => setEditFormData({ ...editFormData, top_speed: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Fuel System</label>
                    <input
                      type="text"
                      placeholder="EFI Electronic Fuel Injection"
                      value={editFormData.fuel_system}
                      onChange={(e) => setEditFormData({ ...editFormData, fuel_system: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Braking</label>
                    <input
                      type="text"
                      placeholder="ABS Front Disc & Rear SBC"
                      value={editFormData.braking}
                      onChange={(e) => setEditFormData({ ...editFormData, braking: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Est. Mileage</label>
                    <input
                      type="text"
                      placeholder="43 km/L"
                      value={editFormData.mileage}
                      onChange={(e) => setEditFormData({ ...editFormData, mileage: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Warranty</label>
                    <input
                      type="text"
                      placeholder="3 Years / 30,000 KM"
                      value={editFormData.warranty}
                      onChange={(e) => setEditFormData({ ...editFormData, warranty: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: FACTORY COLOR VARIANTS */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-cyan-300 block">Factory Colorways ({editFormData.colors.length})</span>
                    <span className="text-[11px] text-slate-400">Available paint combinations in showroom</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Colorway</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {editFormData.colors.map((color, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      
                      {/* Color Picker Swatch */}
                      <div className="sm:col-span-3 flex items-center gap-2">
                        <input
                          type="color"
                          value={color.hex_code || '#00205B'}
                          onChange={(e) => handleColorChange(idx, 'hex_code', e.target.value)}
                          className="w-8 h-8 rounded-lg border border-slate-600 cursor-pointer bg-transparent"
                          title="Choose Color Hex"
                        />
                        <input
                          type="text"
                          value={color.hex_code || '#00205B'}
                          onChange={(e) => handleColorChange(idx, 'hex_code', e.target.value)}
                          className="w-20 bg-slate-950 border border-slate-700 text-white rounded-lg p-1.5 text-xs font-mono"
                          placeholder="#00205B"
                        />
                      </div>

                      {/* Color Name */}
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          placeholder="e.g. Ocean Blue & Milky White"
                          value={color.color_name || ''}
                          onChange={(e) => handleColorChange(idx, 'color_name', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-1.5 text-xs"
                        />
                      </div>

                      {/* Color Variant Image URL */}
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          placeholder="Color-specific image URL"
                          value={color.image_url || ''}
                          onChange={(e) => handleColorChange(idx, 'image_url', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg p-1.5 text-xs"
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(idx)}
                          className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-950 transition-colors cursor-pointer"
                          title="Remove Color"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: VEHICLE DESCRIPTION */}
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-slate-300 font-semibold block">Full Vehicle Overview & Description</label>
                <textarea
                  rows="3"
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  placeholder="Comprehensive description of the scooter, features, comfort, and heritage..."
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:border-cyan-400 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditProductOpen(false)}
                  className="px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSavingProduct}
                  className="px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#00205B] via-[#0055A5] to-[#00A3FF] hover:from-[#003380] hover:to-[#00B4FF] border border-cyan-400/40 shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingProduct ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-cyan-200" />
                      <span>Save & Update Vehicle</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
