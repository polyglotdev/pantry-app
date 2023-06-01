import React from 'react'
import PropTypes from 'prop-types'

const ItemInformation = ({item}) => {
    return (
      <div className="flex-rounded-xl border-t border-gray-200 bg-gray-300 px-4 py-6 sm:px-6 lg:w-96 lg:border-r lg:border-t-0 lg:pl-8 xl:pl-6"> 
       {/* <div className="w-full  p-4 shadow-2xl shadow-teal/40"> */}
        {/* <div className='flex-1 w-full rounded-md bg-green-800 p-8 shadow-teal-300'> */}
            
            <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Item Information</span>
      </div>
    </div>
                <p>Name: {item.name}</p>
                <div className="mb-5"></div>  
                <p>Location: {item.location}</p>
                <div className="mb-5"></div>  
                <p>Food Group: {item.foodGroup}</p>
                <div className="mb-5"></div>  
                <p>Expiration Date: {item.expirationDate}</p>
                <div className="mb-5"></div>  
                <p>Unit: {item.unit}</p>
                <div className="mb-5"></div> 
                <p>Quantity: {item.quantity}</p>
                <div className="mb-5"></div>   
                <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">Alert Settings</span>
      </div>
    </div>
            {/* <h1 className='flex text-lg font-semibold mb-1'>Alert Settings</h1> */}
                <p>Alert Date: {item.alertDate}</p>
                <p>Minimum Quantity: {item.minimumQuantity}</p>
          
          </div>  
        //  </div>  */}
            
    )   
}
ItemInformation.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    expirationDate: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    alertDate: PropTypes.string.isRequired,
    minimumQuantity: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    foodGroup: PropTypes.string.isRequired,
  }).isRequired,
  
 
  };
  


export default ItemInformation;