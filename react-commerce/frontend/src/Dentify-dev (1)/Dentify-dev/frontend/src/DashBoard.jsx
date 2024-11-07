import React from 'react'
import { RolesIcon, UsersIcon } from './components/Icons'
import DenseTable from './components/Table'

const DashBoard = () => {
  return (
    <div className='h-[100vh] flex'>
      <div className="bg-[#439bff] w-[250px] h-full">
        <div className="h-[80px] bg-white flex justify-center items-center gap-2">
          <img src="/image/logo frame.svg" alt="Logo" className="h-[46px] w-[46px]" />
          <span className='text-2xl font-normal'>DENTIIFY</span>
        </div>
        <div className="px-5 py-9 flex flex-col gap-4">
          <div className="h-8 bg-[#FFFFFF] rounded-lg flex items-center gap-3 px-3">
            <RolesIcon />
            <span className="text-xs font-medium text-[#439bff]">Role</span>
          </div>
          <div className="h-8  rounded-lg flex items-center gap-3 px-3">
            <img src="/image/sidebar/Users icon.svg" alt="" />
            <span className="text-xs font-medium text-white">Users</span>
          </div>
          <div className="h-8  rounded-lg flex items-center gap-3 px-3">
            <img src="/image/sidebar/Users icon.svg" alt="" />
            <span className="text-xs font-medium text-white">Products</span>
          </div>
          <div className="h-8  rounded-lg flex items-center gap-3 px-3">
            <img src="/image/sidebar/Users icon.svg" alt="" />
            <span className="text-xs font-medium text-white">Service</span>
          </div>
          <div className="h-8  rounded-lg flex items-center gap-3 px-3">
            <img src="/image/sidebar/Users icon.svg" alt="" />
            <span className="text-xs font-medium text-white">Service Provider</span>
          </div>
            <div className="h-8  rounded-lg flex items-center gap-3 px-3">
              <img src="/image/sidebar/Users icon.svg" alt="" />
              <span className="text-xs font-medium text-white">Materials</span>
            </div>
            <div className="h-8  rounded-lg flex items-center gap-3 px-3">
              <img src="/image/sidebar/jobs.svg" alt="" />
              <span className="text-xs font-medium text-white">jobs</span>
            </div>
            <div className="h-8  rounded-lg flex items-center gap-3 px-3">
              <img src="/image/sidebar/Users icon.svg" alt="" />
              <span className="text-xs font-medium text-white">course</span>
            </div>
        </div>
      </div>
      <div className="h-full flex-1">
        <div className="bg-white h-[80px] px-6 flex items-center justify-between">
          <span className="text-2xl font-bold">Roles</span>
          <div className="flex items-center gap-5">
            <div className="bg-[#f7fbff] rounded-full w-11 h-11 flex items-center justify-center">A</div>
            <div className="bg-[#f7fbff] rounded-full w-11 h-11 flex items-center justify-center">B</div>
          </div>
        </div>
        <div className="bg-[#f7fbff] h-full py-6 px-6">
          <div className="bg-white w-full rounded-xl border border-[#EAE5FF] py-4 px-3">
            

<div class="relative overflow-x-auto  sm:rounded-lg">
<table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
        <tr>
            
            <th scope="col" class="px-6 py-3">
                Product name
            </th>
            <th scope="col" class="px-6 py-3">
                Color
            </th>
            <th scope="col" class="px-6 py-3">
                Category
            </th>
            <th scope="col" class="px-6 py-3">
                Price
            </th>
            <th scope="col" class="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    <tbody>
        <tr class="bg-white border-b hover:bg-gray-50 ">
            
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">
                Silver
            </td>
            <td class="px-6 py-4">
                Laptop
            </td>
            <td class="px-6 py-4">
                $2999
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
        <tr class="bg-white border-b  hover:bg-gray-50 ">
            
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                Microsoft Surface Pro
            </th>
            <td class="px-6 py-4">
                White
            </td>
            <td class="px-6 py-4">
                Laptop PC
            </td>
            <td class="px-6 py-4">
                $1999
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
        <tr class="bg-white border-b  hover:bg-gray-50 ">
            
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                Magic Mouse 2
            </th>
            <td class="px-6 py-4">
                Black
            </td>
            <td class="px-6 py-4">
                Accessories
            </td>
            <td class="px-6 py-4">
                $99
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
        <tr class="bg-white border-b  hover:bg-gray-50 ">
           
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                Apple Watch
            </th>
            <td class="px-6 py-4">
                Black
            </td>
            <td class="px-6 py-4">
                Watches
            </td>
            <td class="px-6 py-4">
                $199
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
        <tr class="bg-white border-b  hover:bg-gray-50 ">
           
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                Apple iMac
            </th>
            <td class="px-6 py-4">
                Silver
            </td>
            <td class="px-6 py-4">
                PC
            </td>
            <td class="px-6 py-4">
                $2999
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600  hover:underline">Edit</a>
            </td>
        </tr>
        <tr class="bg-white border-b  hover:bg-gray-50 ">            
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                Apple AirPods
            </th>
            <td class="px-6 py-4">
                White
            </td>
            <td class="px-6 py-4">
                Accessories
            </td>
            <td class="px-6 py-4">
                $399
            </td>
            <td class="px-6 py-4">
                <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
            </td>
        </tr>
       
    </tbody>
</table>
<nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900">6</span> of <span class="font-semibold text-gray-900">1000</span></span>
    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
        </li>
        <li>
            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>

    </ul>
</nav>
</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
