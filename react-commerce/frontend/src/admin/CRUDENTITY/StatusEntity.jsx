// StatusEntity.js
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

export const StatusEntity = async (entityType, id, currentStatus, setData, data) => {
    console.log(entityType)
    console.log(id)
    console.log(setData)
    console.log(data)
    try {
        const newStatus = currentStatus === 1 ? 0 : 1;
        console.log(newStatus)
        let url = '';

        switch (entityType) {
           
            case 'ProductsImageStatus':
                url = `http://localhost:8081/api/handleproductImagesstatus/${id}`;
                break;

            case 'CategoryStatus':
                url = `http://localhost:8081/api/handlecategorystatus/${id}`;
                break;

            case 'BrandStatus':
                url = `http://localhost:8081/api/handlebrandstatus/${id}`;
                break;

            case 'BannerStatus':
                url = `http://localhost:8081/api/handlebannerstatus/${id}`;
                break;

            case 'CmsStatus':
                // console.log(id)
                url = `http://localhost:8081/api/handlecmsstatus/${id}`;
                break;

            case 'ProductStatus':
                url = `http://localhost:8081/api/handleproductstatus/${id}`;
                break;

            default:
                throw new Error('Invalid entity type');
        }

        await axios.put(url, { status: newStatus });

        const updatedData = data.map(item => {
            if (item.id === id) { //here item.id means api providing data and their corresponding id  
                return { ...item, status: newStatus };
            }
            return item;
        });
        console.log(updatedData)
        setData(updatedData);
        NotificationManager.success(" Status updated successfully!");
    } catch (error) {
        console.error(error);
        NotificationManager.error(" An error occurred while updating the status.");
    }
};
