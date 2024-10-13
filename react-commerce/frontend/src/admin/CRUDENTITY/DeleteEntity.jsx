import axios from "axios";
import { NotificationManager } from "react-notifications";
import Swal from "sweetalert2";

export const DeleteEntity = async (entity, id) => {
  const BASE_URL=process.env.REACT_APP_BASE_URL
    try {
      const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (confirmed.isConfirmed) {
        switch (entity) {
          case 'Category':
            await axios.delete(`${BASE_URL}/api/categorydelete/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;

          case 'Brand':
            await axios.delete(`${BASE_URL}/api/branddelete/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;

          case 'Product':
            await axios.delete(`${BASE_URL}/api/productdelete/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;

          case 'Banner':
            // alert(id)
            await axios.delete(`${BASE_URL}/api/DeleteBanners/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;

          case 'Cms':
            await axios.delete(`${BASE_URL}/api/cmsdelete/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;

          case 'ProductsImage':
            await axios.delete(`${BASE_URL}/api/ProductsImageDelete/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;

          case 'SubAdmin':
            await axios.delete(`${BASE_URL}/api/deleteAdminSubAdminUser/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;  

          case 'Admin':
            await axios.delete(`${BASE_URL}/api/deleteAdminSubAdminUser/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            break;  

          default:
            throw new Error(`Unknown entity: ${entity}`);
        }
        NotificationManager.success(`Successfully deleted by ${entity} `);
        
      } else {
        NotificationManager.error(`Data not deleted  successfully!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  