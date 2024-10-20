import React, { useState } from 'react'
import { Leaf, Flower, Trees, Sun, Cloud, Droplet, Wind, Sprout, Thermometer } from 'lucide-react'

export default function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState('buttons')

  const tabs = ['buttons', 'inputs', 'cards', 'badges', 'alerts', 'toggles', 'progress', 'tooltips', 'chips', 'avatars']

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Plant-Themed Component Showcase</h1>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-green-200 text-green-800 hover:bg-green-300'
            } transition-colors`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {activeTab === 'buttons' && (
          <>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Leafy Button
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full">
              Succulent Button
            </button>
            <button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md">
              Grass Button
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-sm border-b-4 border-emerald-700">
              Forest Button
            </button>
            <button className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded-full border-2 border-green-500">
              Outline Plant Button
            </button>
            <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg">
              Gradient Nature Button
            </button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold py-3 px-6 rounded-full shadow-lg">
              Sunflower Button
            </button>
            <button className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg border-t-4 border-pink-600">
              Flower Button
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full shadow-inner">
              Lavender Button
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transform transition hover:scale-105">
              Citrus Button
            </button>
          </>
        )}

        {activeTab === 'inputs' && (
          <>
            <input
              type="text"
              placeholder="Leafy Input"
              className="w-full px-4 py-2 rounded border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Succulent Input"
              className="w-full px-4 py-2 rounded-full border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <input
              type="text"
              placeholder="Grass Input"
              className="w-full px-4 py-3 rounded-lg border-2 border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-300 bg-lime-50"
            />
            <input
              type="text"
              placeholder="Forest Input"
              className="w-full px-4 py-2 rounded-sm border-b-2 border-emerald-500 focus:outline-none focus:border-emerald-700"
            />
            <input
              type="text"
              placeholder="Outline Plant Input"
              className="w-full px-4 py-2 rounded-full border-2 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200 bg-green-50"
            />
            <input
              type="text"
              placeholder="Gradient Nature Input"
              className="w-full px-4 py-2 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gradient-to-r from-green-100 to-blue-100"
            />
            <input
              type="text"
              placeholder="Sunflower Input"
              className="w-full px-4 py-3 rounded-full border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-yellow-50"
            />
            <input
              type="text"
              placeholder="Flower Input"
              className="w-full px-4 py-2 rounded-lg border-t-2 border-pink-400 focus:outline-none focus:border-pink-600 bg-pink-50"
            />
            <input
              type="text"
              placeholder="Lavender Input"
              className="w-full px-4 py-2 rounded-full border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-indigo-50"
            />
            <input
              type="text"
              placeholder="Citrus Input"
              className="w-full px-4 py-3 rounded-lg border-2 border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-orange-50"
            />
          </>
        )}

        {activeTab === 'cards' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Leafy Card</h3>
              <p className="text-green-600">This card represents a lush, green leaf.</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-full shadow-lg">
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Succulent Card</h3>
              <p className="text-teal-600">A round card inspired by succulents.</p>
            </div>
            <div className="bg-lime-100 p-6 rounded-lg shadow-md border-b-4 border-lime-500">
              <h3 className="text-lg font-semibold text-lime-800 mb-2">Grass Card</h3>
              <p className="text-lime-600">Feel the freshness of a grassy meadow.</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-sm shadow-lg border-r-4 border-emerald-500">
              <h3 className="text-lg font-semibold text-emerald-800 mb-2">Forest Card</h3>
              <p className="text-emerald-600">Inspired by the depths of a lush forest.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-300">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Outline Plant Card</h3>
              <p className="text-green-600">A delicate card with a plant-inspired border.</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Gradient Nature Card</h3>
              <p className="text-blue-600">A card that blends the colors of nature.</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg shadow-md border-t-4 border-yellow-400">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Sunflower Card</h3>
              <p className="text-yellow-600">Bright and cheerful like a sunflower.</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-full shadow-lg">
              <h3 className="text-lg font-semibold text-pink-800 mb-2">Flower Card</h3>
              <p className="text-pink-600">A delicate card inspired by flower petals.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow-md border-l-4 border-indigo-400">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Lavender Card</h3>
              <p className="text-indigo-600">Calming and serene like a lavender field.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg shadow-md transform rotate-1">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Citrus Card</h3>
              <p className="text-orange-600">Zesty and energetic like a citrus fruit.</p>
            </div>
          </>
        )}

        {activeTab === 'badges' && (
          <>
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Leaf Badge</span>
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Succulent Badge</span>
            <span className="inline-block bg-lime-100 text-lime-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">Grass Badge</span>
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm">Forest Badge</span>
            <span className="inline-block bg-green-50 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-400">Outline Plant Badge</span>
            <span className="inline-block bg-gradient-to-r from-green-200 to-blue-200 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Gradient Nature Badge</span>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Sunflower Badge</span>
            <span className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-2.5 py-0.5 rounded">Flower Badge</span>
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-lg">Lavender Badge</span>
            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded transform -rotate-2">Citrus Badge</span>
          </>
        )}

        {activeTab === 'alerts' && (
          <>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
              <p className="font-bold">Leaf Alert</p>
              <p>New growth detected in your garden!</p>
            </div>
            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p className="font-bold">Succulent Alert</p>
                  <p className="text-sm">Your succulents need watering!</p>
                </div>
              </div>
            </div>
            <div className="bg-lime-100 border border-lime-400 text-lime-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Grass Alert!</strong>
              <span className="block sm:inline"> Time to mow the lawn.</span>
            </div>
            <div className="bg-emerald-100 border-r-4 border-emerald-500 text-emerald-700 p-4" role="alert">
              <p className="font-bold">Forest Alert</p>
              <p>New wildlife spotted in the area!</p>
            </div>
            <div className="bg-green-50 border-2 border-green-300 text-green-800  rounded-lg p-4 shadow-md" role="alert">
              <p className="font-bold">Plant Care Alert</p>
              <p>Remember to fertilize your plants this week.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-green-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
              <p className="font-bold">Nature Alert</p>
              <p>Rainfall expected tomorrow. Prepare your garden!</p>
            </div>
            <div className="bg-yellow-100 border-b-4 border-yellow-500 rounded-t text-yellow-900 px-4 py-3 shadow-md" role="alert">
              <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p className="font-bold">Sunflower Alert</p>
                  <p className="text-sm">Sunflowers are ready for harvest!</p>
                </div>
              </div>
            </div>
            <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Flower Alert!</strong>
              <span className="block sm:inline"> Your roses are blooming.</span>
            </div>
            <div className="bg-indigo-100 border-t-4 border-indigo-500 rounded-b text-indigo-900 px-4 py-3 shadow-md" role="alert">
              <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-indigo-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p className="font-bold">Lavender Alert</p>
                  <p className="text-sm">Time to harvest your lavender!</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
              <p className="font-bold">Citrus Alert</p>
              <p>Your citrus trees need pruning.</p>
            </div>
          </>
        )}

        {activeTab === 'toggles' && (
          <>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Leaf Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Succulent Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Grass Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-sm peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-sm after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Forest Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 border-2 border-green-300 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-400"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Plant Outline Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gradient-to-r from-green-200 to-blue-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-400 peer-checked:to-blue-400"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Nature Gradient Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Sunflower Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-400"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Flower Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Lavender Toggle</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">Citrus Toggle</span>
            </label>
          </>
        )}

        {activeTab === 'progress' && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-teal-600 h-2.5 rounded-full" style={{width: '60%'}}></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-lime-600 h-4 rounded-full" style={{width: '75%'}}></div>
            </div>
            <div className="w-full bg-gray-200 rounded-sm h-2.5">
              <div className="bg-emerald-600 h-2.5 rounded-sm" style={{width: '30%'}}></div>
            </div>
            <div className="w-full bg-green-100 rounded-full h-2.5 border border-green-300">
              <div className="bg-green-500 h-2.5 rounded-full" style={{width: '50%'}}></div>
            </div>
            <div className="w-full bg-gradient-to-r from-green-200 to-blue-200 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full" style={{width: '80%'}}></div>
            </div>
            <div className="w-full bg-yellow-100 rounded-full h-4">
              <div className="bg-yellow-400 h-4 rounded-full text-xs font-medium text-yellow-800 text-center p-0.5 leading-none" style={{width: '65%'}}>65%</div>
            </div>
            <div className="w-full bg-pink-100 rounded-full h-2.5">
              <div className="bg-pink-500 h-2.5 rounded-full" style={{width: '40%'}}></div>
            </div>
            <div className="w-full bg-indigo-100 rounded-full h-1.5">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{width: '55%'}}></div>
            </div>
            <div className="w-full bg-orange-100 rounded-full h-3">
              <div className="bg-orange-500 h-3 rounded-full" style={{width: '70%'}}></div>
            </div>
          </>
        )}

        {activeTab === 'tooltips' && (
          <>
            <div className="relative inline-block group">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Leaf Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-white bg-green-800 rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                This is a leaf tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-full">Succulent Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-white bg-teal-800 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                This is a succulent tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-lime-500 text-white px-4 py-2 rounded-lg">Grass Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-lime-800 bg-lime-200 rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                This is a grass tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-sm">Forest Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-white bg-emerald-800 rounded-sm opacity-0 transition-opacity group-hover:opacity-100">
                This is a forest tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-green-100 text-green-800 px-4 py-2 rounded-full border-2 border-green-500">Plant Outline Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-green-800 bg-green-100 rounded-full border-2 border-green-500 opacity-0 transition-opacity group-hover:opacity-100">
                This is a plant outline tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded">Nature Gradient Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-white bg-gradient-to-r from-green-600 to-blue-700 rounded opacity-0 transition-opacity group-hover:opacity-100">
                This is a nature gradient tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-yellow-400 text-yellow-800 px-4 py-2 rounded-full">Sunflower Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-yellow-800 bg-yellow-200 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                This is a sunflower tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-pink-400 text-white px-4 py-2 rounded-lg">Flower Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-white bg-pink-600 rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                This is a flower tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded">Lavender Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-white bg-indigo-700 rounded opacity-0 transition-opacity group-hover:opacity-100">
                This is a lavender tooltip
              </div>
            </div>
            <div className="relative inline-block group">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Citrus Tooltip</button>
              <div className="absolute z-10 w-32 p-2 mt-2 text-sm text-white bg-orange-700 rounded-lg opacity-0 transition-opacity group-hover:opacity-100">
                This is a citrus tooltip
              </div>
            </div>
          </>
        )}

        {activeTab === 'chips' && (
          <>
            <span className="px-4 py-2 rounded-full text-green-600 bg-green-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Leaf Chip
            </span>
            <span className="px-4 py-2 rounded-full text-teal-600 bg-teal-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Succulent Chip
            </span>
            <span className="px-4 py-2 rounded-lg text-lime-600 bg-lime-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Grass Chip
            </span>
            <span className="px-4 py-2 rounded-sm text-emerald-600 bg-emerald-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Forest Chip
            </span>
            <span className="px-4 py-2 rounded-full text-green-800 bg-green-100 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease border border-green-500">
              Plant Outline Chip
            </span>
            <span className="px-4 py-2 rounded-full text-white bg-gradient-to-r from-green-400 to-blue-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Nature Gradient Chip
            </span>
            <span className="px-4 py-2 rounded-full text-yellow-600 bg-yellow-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Sunflower Chip
            </span>
            <span className="px-4 py-2 rounded-lg text-pink-600 bg-pink-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Flower Chip
            </span>
            <span className="px-4 py-2 rounded-full text-indigo-600 bg-indigo-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Lavender Chip
            </span>
            <span className="px-4 py-2 rounded-lg text-orange-600 bg-orange-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
              Citrus Chip
            </span>
          </>
        )}

        {activeTab === 'avatars' && (
          <>
            <div className="relative w-10 h-10 overflow-hidden bg-green-100 rounded-full">
              <Leaf className="absolute w-12 h-12 text-green-400 -left-1" />
            </div>
            <div className="relative w-10 h-10 overflow-hidden bg-teal-100 rounded-full">
              <Flower className="absolute w-12 h-12 text-teal-400 -left-1" />
            </div>
            <div className="relative w-10 h-10 overflow-hidden bg-lime-100 rounded-full">
              <Sprout className="absolute w-12 h-12 text-lime-400 -left-1" />
            </div>
            <div className="relative w-10 h-10 overflow-hidden bg-emerald-100 rounded-full">
              <Trees className="absolute w-12 h-12 text-emerald-400 -left-1" />
            </div>
            {/* <div className="relative w-10 h-10 overflow-hidden bg-green-100 rounded-full border-2 border-green-500">
              <Seedling className="absolute w-12 h-12 text-green-400 -left-1" />
            </div> */}
            <div className="relative w-10 h-10 overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 rounded-full">
              <Cloud className="absolute w-12 h-12 text-blue-400 -left-1" />
            </div>
            <div className="relative w-10 h-10 overflow-hidden bg-yellow-100 rounded-full">
              <Sun className="absolute w-12 h-12 text-yellow-400 -left-1" />
            </div>
            <div className="relative w-10 h-10 overflow-hidden bg-pink-100 rounded-full">
              <Flower className="absolute w-12 h-12 text-pink-400 -left-1" />
            </div>
            <div className="relative w-10 h-10 overflow-hidden bg-indigo-100 rounded-full">
              <Wind className="absolute w-12 h-12 text-indigo-400 -left-1" />
            </div>
            <div className="relative w-10 h-10 overflow-hidden bg-orange-100 rounded-full">
              <Thermometer className="absolute w-12 h-12 text-orange-400 -left-1" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}