/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
// 'use client';
// 'use client';
// import { zodResolver } from '@hookform/resolvers/zod';
// import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
// import {
//   Autocomplete,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
// } from '@mui/material';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import React, { useState, useTransition } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { z } from 'zod';

// import { cities } from '@/constants/cities';
// import { provinces } from '@/constants/provinces';

// type OrderBookButtonProps = {
//   book_id: string;
//   book_title: string;
// };

// // Zod schema for validating order fields
// const orderSchema = z.object({
//   count: z.number().int().min(1, { message: 'At least 1 item is required' }),
//   shipping_address: z.string().min(10, {
//     message: 'Address is required and must be at least 10 characters',
//   }),
//   province: z
//     .object({
//       province_id: z.string(),
//       province: z.string(),
//     })
//     .nullable(),
//   city: z
//     .object({
//       city_id: z.string(),
//       province_id: z.string(),
//       province: z.string(),
//       type: z.string(),
//       city_name: z.string(),
//       postal_code: z.string(),
//     })
//     .nullable(),
//   postal_code: z.string().min(5, { message: 'Postal code is required' }),
//   courier: z.string().min(1, { message: 'Courier is required' }),
//   weight: z.number().min(1, { message: 'Weight must be greater than 0' }),
// });

// type OrderFormData = z.infer<typeof orderSchema>;

// export default function OrderBookButton({
//   book_id,
//   book_title,
// }: OrderBookButtonProps) {
//   const [isPending, startTransition] = useTransition();
//   const [open, setOpen] = useState(false);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [shipping_cost, setShippingCost] = useState(0);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     watch,
//   } = useForm<OrderFormData>({
//     resolver: zodResolver(orderSchema),
//   });

//   const selectedProvince = watch('province');
//   const selectedCity = watch('city');

//   const handleClickOpen = () => {
//     setOpen(true); // Open the modal
//   };

//   const handleClose = () => {
//     setOpen(false); // Close the modal
//   };

//   const handleCheckPrice = async () => {
//     setLoading(true);
//     try {
//       const formData = watch();
//       const { data } = await axios.post(
//         'https://api.rajaongkir.com/starter/cost',
//         {
//           origin: '115', // Example origin city_id (Depok)
//           destination: formData.city?.city_id, // Send the city_id from the selected city object
//           weight: formData.weight,
//           courier: formData.courier,
//         },
//         {
//           headers: {
//             key: process.env.RAJAONGKIR_API_KEY,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       toast.success('Price checked successfully');
//       setShippingCost(data.rajaongkir.results);
//     } catch (error) {
//       toast.error('Failed to check price' + error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         startIcon={<ShoppingCartCheckoutRoundedIcon />}
//         variant='contained'
//         color='primary'
//         disabled={isPending}
//         onClick={handleClickOpen}
//       >
//         Order Book
//       </Button>

//       {/* Confirmation Modal */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>
//           Order Book - <strong> "{book_title}"</strong>
//         </DialogTitle>
//         <DialogContent>
//           <form>
//             <TextField
//               label='Count'
//               margin='dense'
//               fullWidth
//               type='number'
//               {...register('count')}
//               error={!!errors.count}
//               helperText={errors.count?.message}
//             />
//             <TextField
//               margin='dense'
//               label='Shipping Address'
//               fullWidth
//               {...register('shipping_address')}
//               error={!!errors.shipping_address}
//               helperText={errors.shipping_address?.message}
//             />

//             <Controller
//               name='province'
//               control={control}
//               render={({ field }) => (
//                 <Autocomplete
//                   {...field}
//                   options={provinces}
//                   getOptionLabel={(option) => option.province}
//                   onChange={(_, value) => field.onChange(value)} // Set the full province object
//                   value={field.value || null}
//                   renderInput={(params) => (
//                     <TextField
//                       margin='dense'
//                       {...params}
//                       label='Province'
//                       error={!!errors.province}
//                       helperText={errors.province?.message}
//                     />
//                   )}
//                 />
//               )}
//             />

//             <Controller
//               name='city'
//               control={control}
//               render={({ field }) => (
//                 <Autocomplete
//                   {...field}
//                   options={
//                     selectedProvince
//                       ? cities.filter(
//                           (city) =>
//                             city.province_id === selectedProvince.province_id
//                         )
//                       : []
//                   }
//                   getOptionLabel={(option) => option.city_name}
//                   onChange={(_, value) => field.onChange(value)} // Set the full city object
//                   value={field.value || null}
//                   renderInput={(params) => (
//                     <TextField
//                       margin='dense'
//                       {...params}
//                       label='City'
//                       error={!!errors.city}
//                       helperText={errors.city?.message}
//                     />
//                   )}
//                 />
//               )}
//             />

//             <TextField
//               margin='dense'
//               label='Postal Code'
//               fullWidth
//               value={selectedCity?.postal_code || ''} // Automatically fill postal code
//               {...register('postal_code')}
//               error={!!errors.postal_code}
//               helperText={errors.postal_code?.message}
//             />

//             <TextField
//               margin='dense'
//               label='Courier'
//               fullWidth
//               {...register('courier')}
//               error={!!errors.courier}
//               helperText={errors.courier?.message}
//             />
//             <TextField
//               margin='dense'
//               label='Weight (gram)'
//               fullWidth
//               type='number'
//               {...register('weight')}
//               error={!!errors.weight}
//               helperText={errors.weight?.message}
//             />

//             <Typography>{shipping_cost}</Typography>
//             <Button
//               variant='contained'
//               color='primary'
//               onClick={handleCheckPrice}
//               disabled={loading}
//               className='mt-2'
//             >
//               Check Price
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { cities } from '@/constants/cities';
import { provinces } from '@/constants/provinces';

// Zod schema for validating order fields
const orderSchema = z.object({
  count: z.number().int().min(1, { message: 'At least 1 item is required' }),
  shipping_address: z.string().min(10, {
    message: 'Address is required and must be at least 10 characters',
  }),
  province: z
    .object({
      province_id: z.string(),
      province: z.string(),
    })
    .nullable(),
  city: z
    .object({
      city_id: z.string(),
      province_id: z.string(),
      province: z.string(),
      type: z.string(),
      city_name: z.string(),
      postal_code: z.string(),
    })
    .nullable(),
  postal_code: z.string().min(5, { message: 'Postal code is required' }),
  courier: z.string().min(1, { message: 'Courier is required' }),
  weight: z.number().min(1, { message: 'Weight must be greater than 0' }),
});

type OrderFormData = z.infer<typeof orderSchema>;

type OrderBookButtonProps = {
  book_id: string;
  book_title: string;
};

export default function OrderBookButton({
  book_id,
  book_title,
}: OrderBookButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [shippingServices, setShippingServices] = useState<any[]>([]); // To store the available services
  const [selectedService, setSelectedService] = useState<any>(null); // To store the selected service

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const selectedProvince = watch('province');
  const selectedCity = watch('city');

  const handleClickOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  // const handleCheckPrice = async () => {
  //   setLoading(true);
  //   try {
  //     const formData = watch(); // Get form data
  //     const { province, city, weight, courier } = formData;

  //     // Send request to your API to calculate the shipping cost
  //     const { data } = await axios.post('/api/shipping-cost', {
  //       origin: '115', // Example origin city_id (Depok)
  //       destination: city?.city_id, // Use city_id from selected city
  //       weight: weight, // Convert weight to grams (if needed)
  //       courier: courier, // Courier service
  //     });

  //     toast.success('Price checked successfully');
  //     setShippingServices(data.rajaongkir.results[0].costs);
  //   } catch (error) {
  //     toast.error('Failed to check price: ' + error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleCheckPrice = async () => {
    setLoading(true);
    try {
      const formData = watch(); // Get form data
      const { province, city, weight, courier } = formData;

      // Create a FormData object
      const formDataObject = new FormData();
      formDataObject.append('origin', '115'); // Example origin city_id (Depok)
      formDataObject.append('destination', city?.city_id || ''); // Use city_id from selected city
      formDataObject.append('weight', weight.toString()); // Convert weight to string (FormData expects string values)
      formDataObject.append('courier', courier);

      // Send request to your API to calculate the shipping cost
      const response = await fetch('/api/shipping-cost', {
        method: 'POST',
        body: formDataObject, // Send form data as the body
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json(); // Only parse if response is ok

      if (!data || !data.rajaongkir || !data.rajaongkir.results) {
        throw new Error('Invalid response structure');
      }

      toast.success('Price checked successfully');
      setShippingServices(data.rajaongkir.results[0].costs);
    } catch (error) {
      toast.error(
        'Failed to check price: ' +
          (error instanceof Error ? error.message : error)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        startIcon={<ShoppingCartCheckoutRoundedIcon />}
        variant='contained'
        color='primary'
        disabled={isPending}
        onClick={handleClickOpen}
      >
        Order Book
      </Button>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Order Book - <strong> "{book_title}"</strong>
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label='Count'
              margin='dense'
              fullWidth
              type='number'
              {...register('count')}
              error={!!errors.count}
              helperText={errors.count?.message}
            />
            <TextField
              margin='dense'
              label='Shipping Address'
              fullWidth
              {...register('shipping_address')}
              error={!!errors.shipping_address}
              helperText={errors.shipping_address?.message}
            />

            <Controller
              name='province'
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={provinces}
                  getOptionLabel={(option) => option.province}
                  onChange={(_, value) => field.onChange(value)} // Set the full province object
                  value={field.value || null}
                  renderInput={(params) => (
                    <TextField
                      margin='dense'
                      {...params}
                      label='Province'
                      error={!!errors.province}
                      helperText={errors.province?.message}
                    />
                  )}
                />
              )}
            />

            <Controller
              name='city'
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={
                    selectedProvince
                      ? cities.filter(
                          (city) =>
                            city.province_id === selectedProvince.province_id
                        )
                      : []
                  }
                  getOptionLabel={(option) => option.city_name}
                  onChange={(_, value) => field.onChange(value)} // Set the full city object
                  value={field.value || null}
                  renderInput={(params) => (
                    <TextField
                      margin='dense'
                      {...params}
                      label='City'
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              )}
            />

            <TextField
              margin='dense'
              label='Postal Code'
              fullWidth
              value={selectedCity?.postal_code || ''} // Automatically fill postal code
              {...register('postal_code')}
              error={!!errors.postal_code}
              helperText={errors.postal_code?.message}
            />

            <TextField
              margin='dense'
              label='Courier'
              fullWidth
              {...register('courier')}
              error={!!errors.courier}
              helperText={errors.courier?.message}
            />
            <TextField
              margin='dense'
              label='Weight (gram)'
              fullWidth
              type='number'
              {...register('weight')}
              error={!!errors.weight}
              helperText={errors.weight?.message}
            />

            <Button
              variant='contained'
              color='primary'
              onClick={handleCheckPrice}
              disabled={loading}
              className='mt-2'
            >
              Check Price
            </Button>

            {/* Show available shipping options */}
            {shippingServices.length > 0 && (
              <div className='mt-4'>
                <Typography variant='h6'>Select Shipping Service:</Typography>
                <Autocomplete
                  options={shippingServices}
                  getOptionLabel={(option) =>
                    `${option.service} - ${option.cost[0].value} IDR (${option.description})`
                  }
                  onChange={(_, value) => setSelectedService(value)}
                  renderInput={(params) => (
                    <TextField {...params} label='Shipping Service' />
                  )}
                />
                {selectedService && (
                  <Typography variant='body1' className='mt-2'>
                    Selected: {selectedService.service} (
                    {selectedService.cost[0].value} IDR) - Estimated delivery:{' '}
                    {selectedService.cost[0].etd} days
                  </Typography>
                )}
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
