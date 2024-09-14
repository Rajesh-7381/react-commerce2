import axios from "axios";
import { NotificationManager } from "react-notifications";
import Swal from "sweetalert2";

export const DeleteEntity = async (entity, id) => {
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
            await axios.delete(`http://localhost:8081/api/categorydelete/${id}`);
            break;

          case 'Brand':
            await axios.delete(`http://localhost:8081/api/branddelete/${id}`);
            break;

          case 'Product':
            await axios.delete(`http://localhost:8081/api/productdelete/${id}`);
            break;

          case 'Banner':
            // alert(id)
            await axios.delete(`http://localhost:8081/api/DeleteBanners/${id}`);
            break;

          case 'Cms':
            await axios.delete(`http://localhost:8081/api/cmsdelete/${id}`);
            break;

          case 'ProductsImage':
            await axios.delete(`http://localhost:8081/api/ProductsImageDelete/${id}`);
            break;

          case 'SubAdmin':
            await axios.delete(`http://localhost:8081/api/deleteAdminSubAdminUser/${id}`);
            break;  

          case 'Admin':
            await axios.delete(`http://localhost:8081/api/deleteAdminSubAdminUser/${id}`);
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

  