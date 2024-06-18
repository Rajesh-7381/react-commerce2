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
          case 'category':
            await axios.delete(`http://localhost:8081/categorydelete/${id}`);
            break;
          case 'brand':
            await axios.delete(`http://localhost:8081/branddelete/${id}`);
            break;
          case 'product':
            await axios.delete(`http://localhost:8081/productdelete/${id}`);
            break;
          case 'Banner':
            await axios.delete(`http://localhost:8081/DeleteBanners/${id}`);
            break;
          default:
            throw new Error(`Unknown entity: ${entity}`);
        }
        NotificationManager.success(`Successfully deleted ${entity} data`);
        
      } else {
        NotificationManager.error(`Data not deleted  successfully!`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  