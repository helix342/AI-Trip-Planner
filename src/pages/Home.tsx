import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar, Users, ArrowRight, Filter, IndianRupee, Clock, Heart, UserPlus } from 'lucide-react';
import { useTripStore } from '../store/tripStore';

const indianCities = [
  {
    "name": "Delhi",
    "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    "description": "Capital city with rich history",
    "duration": "3-4 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Mumbai",
    "image": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    "description": "City of Dreams",
    "duration": "4-5 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Jaipur",
    "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    "description": "Pink City of India",
    "duration": "2-3 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Goa",
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    "description": "Beach Paradise",
    "duration": "4-5 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Varanasi",
    "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    "description": "Spiritual Capital",
    "duration": "2-3 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Agra",
    "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
    "description": "Home of Taj Mahal",
    "duration": "1-2 days",
    "budget": "₹8,000-12,000"
  },
  {
    "name": "Udaipur",
    "image": "https://plus.unsplash.com/premium_photo-1697730426227-9056296a0315?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Udaipur",
    "duration": "3-4 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Jodhpur",
    "image": "https://plus.unsplash.com/premium_photo-1697730421382-bc8dd92f83ba?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Jodhpur",
    "duration": "4-5 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Jaisalmer",
    "image": "https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Jaisalmer",
    "duration": "4-5 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Mount Abu",
    "image": "https://images.unsplash.com/photo-1630825828081-e80577f6e2df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Mount Abu",
    "duration": "4-5 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Amritsar",
    "image": "https://plus.unsplash.com/premium_photo-1697730324062-c012bc98eb13?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Amritsar",
    "duration": "2-3 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Rishikesh",
    "image": "https://images.unsplash.com/photo-1607406374368-809f8ec7f118?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Rishikesh",
    "duration": "2-3 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Haridwar",
    "image": "https://images.unsplash.com/photo-1622611908679-cbeda47d9404?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Haridwar",
    "duration": "2-3 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Shimla",
    "image": "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Shimla",
    "duration": "2-3 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Manali",
    "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Manali",
    "duration": "2-3 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Leh",
    "image": "https://images.unsplash.com/photo-1600242466690-c1c04f081762?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Leh",
    "duration": "4-5 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Srinagar",
    "image": "https://images.unsplash.com/photo-1614591276564-7b3e69347a48?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Srinagar",
    "duration": "2-3 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Pune",
    "image": "https://images.unsplash.com/photo-1570356811230-2f3b816ebb29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Pune",
    "duration": "2-3 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Nashik",
    "image": "https://images.unsplash.com/photo-1570356811230-2f3b816ebb29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Nashik",
    "duration": "4-5 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Aurangabad",
    "image": "https://plus.unsplash.com/premium_photo-1697729588019-20a1f5a325d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Aurangabad",
    "duration": "4-5 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Ahmedabad",
    "image": "https://plus.unsplash.com/premium_photo-1697730467431-323d86486a4c?q=80&w=2113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Ahmedabad",
    "duration": "2-3 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Surat",
    "image": "https://images.unsplash.com/photo-1613413142877-982c5ec3d4aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Surat",
    "duration": "4-5 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Vadodara",
    "image": "https://images.unsplash.com/photo-1677648626156-acad341ce207?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Vadodara",
    "duration": "2-3 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Bengaluru",
    "image": "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?qhttps://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Bengaluru",
    "duration": "4-5 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Mysore",
    "image": "https://plus.unsplash.com/premium_photo-1697729434815-40ab4970ebc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Mysore",
    "duration": "2-3 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Hampi",
    "image": "https://plus.unsplash.com/premium_photo-1697730337612-8bd916249e30?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Hampi",
    "duration": "3-4 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Hyderabad",
    "image": "https://images.unsplash.com/photo-1551161242-b5af797b7233?q=80&w=2051&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Hyderabad",
    "duration": "4-5 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Warangal",
    "image": "https://plus.unsplash.com/premium_photo-1694475205503-d6c6a71f03bc?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Warangal",
    "duration": "3-4 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Chennai",
    "image": "https://images.unsplash.com/photo-1661366698983-3cb843219300?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Chennai",
    "duration": "2-3 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Madurai",
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Madurai",
    "duration": "3-4 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Coimbatore",
    "image": "https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Coimbatore",
    "duration": "4-5 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Thanjavur",
    "image": "https://plus.unsplash.com/premium_photo-1697729536647-4e23a32dd324?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Thanjavur",
    "duration": "3-4 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Kanyakumari",
    "image": "https://images.unsplash.com/photo-1527705381526-469031509a9d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Kanyakumari",
    "duration": "4-5 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Ooty",
    "image": "https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Ooty",
    "duration": "2-3 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Kodaikanal",
    "image": "https://images.unsplash.com/photo-1570832764204-f209aa9cd28f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Kodaikanal",
    "duration": "2-3 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Kochi",
    "image": "https://images.unsplash.com/photo-1590123732197-e7079d2ceb89?q=80&w=2107&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Kochi",
    "duration": "3-4 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Munnar",
    "image": "https://images.unsplash.com/photo-1637066742971-726bee8d9f56?q=80&w=2149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Munnar",
    "duration": "2-3 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Thekkady",
    "image": "https://images.unsplash.com/photo-1716112371152-67a7086660fb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Thekkady",
    "duration": "4-5 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Thiruvananthapuram",
    "image": "https://images.unsplash.com/photo-1725680968792-c8dce6d6cf18?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Thiruvananthapuram",
    "duration": "2-3 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Alleppey",
    "image": "https://images.unsplash.com/photo-1677475455627-f013d44bd864?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Alleppey",
    "duration": "4-5 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Kolkata",
    "image": "https://images.unsplash.com/photo-1597220397294-0d95abb2031c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Kolkata",
    "duration": "3-4 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Darjeeling",
    "image": "https://plus.unsplash.com/premium_photo-1697730303782-6679b6bec202?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Darjeeling",
    "duration": "3-4 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Siliguri",
    "image": "https://images.unsplash.com/photo-1668007598394-292ee944e83b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Siliguri",
    "duration": "4-5 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Bhubaneswar",
    "image": "https://images.unsplash.com/photo-1707241934268-5a0c8e206d9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Bhubaneswar",
    "duration": "3-4 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Puri",
    "image": "https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Puri",
    "duration": "4-5 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Konark",
    "image": "https://images.unsplash.com/photo-1639980290886-6bdd61c7582b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Konark",
    "duration": "2-3 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Gaya",
    "image": "https://images.unsplash.com/photo-1622194993926-1801586d460f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Gaya",
    "duration": "3-4 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Patna",
    "image": "https://images.unsplash.com/photo-1561400930-ab18eb910ee5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Patna",
    "duration": "2-3 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Ranchi",
    "image": "https://images.unsplash.com/photo-1609991148865-40902bd1f594?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Ranchi",
    "duration": "2-3 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Gangtok",
    "image": "https://plus.unsplash.com/premium_photo-1697730418140-064a5b6c2e17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Gangtok",
    "duration": "2-3 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Shillong",
    "image": "https://images.unsplash.com/photo-1594514113865-d1deac339435?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Shillong",
    "duration": "2-3 days",
    "budget": "₹15,000-25,000"
  },
  {
    "name": "Tawang",
    "image": "https://images.unsplash.com/photo-1628070018796-a9f4e2dd482a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Tawang",
    "duration": "3-4 days",
    "budget": "₹10,000-15,000"
  },
  {
    "name": "Aizawl",
    "image": "https://images.unsplash.com/photo-1649320790494-056d741d9981?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Aizawl",
    "duration": "2-3 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Imphal",
    "image": "https://images.unsplash.com/photo-1636988285188-6d9400c4f07f?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Imphal",
    "duration": "3-4 days",
    "budget": "₹20,000-30,000"
  },
  {
    "name": "Kohima",
    "image": "https://images.unsplash.com/photo-1635998973091-30df63f081a3?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Kohima",
    "duration": "2-3 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Agartala",
    "image": "https://images.unsplash.com/photo-1706880471181-36203d8844fc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Agartala",
    "duration": "3-4 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Itanagar",
    "image": "https://images.unsplash.com/photo-1729678427233-ab8d59dc4fa6?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Itanagar",
    "duration": "3-4 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Port Blair",
    "image": "https://images.unsplash.com/photo-1640618792277-b91f3199f6a8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Port Blair",
    "duration": "3-4 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Kavaratti",
    "image": "https://images.unsplash.com/photo-1572431447238-425af66a273b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Kavaratti",
    "duration": "2-3 days",
    "budget": "₹12,000-18,000"
  },
  {
    "name": "Puducherry",
    "image": "https://images.unsplash.com/photo-1569157087866-f4a8e9250605?q=80&w=1947&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Puducherry",
    "duration": "3-4 days",
    "budget": "₹18,000-28,000"
  },
  {
    "name": "Chandigarh",
    "image": "https://images.unsplash.com/photo-1614687345016-9183348d8f35?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": "Popular destination in Chandigarh",
    "duration": "4-5 days",
    "budget": "₹10,000-15,000"
  }
];

const allIndianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", 
  "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", 
  "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", 
  "Faridabad", "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", 
  "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", 
  "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", 
  "Guwahati", "Solapur", "Hubli-Dharwad", "Mysore"
];

export default function Home() {
  const navigate = useNavigate();
  const { setTripDetails } = useTripStore();
  const [fromCity, setFromCity] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [toCity, setToCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [budget, setBudget] = useState([5000, 50000]);
  const [duration, setDuration] = useState(3);
  const [travelType, setTravelType] = useState('');
  const [filteredCities, setFilteredCities] = useState(indianCities);

  const handleFromCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromCity(value);
    
    if (value.length > 0) {
      const filtered = allIndianCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectCity = (city: string) => {
    setFromCity(city);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClick = () => setShowSuggestions(false);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTripDetails({
      fromCity,
      toCity,
      startDate,
      endDate,
      travelers,
      budget,
      duration,
      travelType
    });
    navigate('/transport');
  };

  const applyFilters = () => {
    const filtered = indianCities.filter(city => {
      const cityBudget = parseInt(city.budget.split('-')[1].replace(/[^\d]/g, ''));
      return cityBudget <= budget[1];
    });
    setFilteredCities(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover India's Magic
          </h1>
          <p className="text-lg text-gray-600">
            Let our AI help you plan the perfect Indian adventure
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={fromCity}
                    onChange={handleFromCityChange}
                    onFocus={() => setShowSuggestions(true)}
                    required
                    placeholder="Your city"
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto">
                      {suggestions.map((city) => (
                        <div
                          key={city}
                          className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                          onClick={() => selectCity(city)}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select destination</option>
                    {indianCities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || format(new Date(), 'yyyy-MM-dd')}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              >
                <Filter className="h-5 w-5" />
                <span>Advanced Filters</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    required
                    className="pl-10 w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Plan My Trip
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 p-6 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range (₹)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      value={budget[1]}
                      onChange={(e) => setBudget([5000, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹5,000</span>
                      <span>₹{budget[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Solo', 'Couple', 'Family', 'Friends'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTravelType(type)}
                        className={`flex items-center justify-center px-4 py-2 rounded-md ${
                          travelType === type
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {type === 'Solo' && <Users className="h-4 w-4 mr-2" />}
                        {type === 'Couple' && <Heart className="h-4 w-4 mr-2" />}
                        {type === 'Family' && <UserPlus className="h-4 w-4 mr-2" />}
                        {type === 'Friends' && <Users className="h-4 w-4 mr-2" />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.name}
              onClick={() => setToCity(city.name)}
              className={`cursor-pointer rounded-lg overflow-hidden shadow-md transition-all transform hover:scale-105 ${
                toCity === city.name ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-gray-900">{city.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{city.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {city.duration}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {city.budget}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}