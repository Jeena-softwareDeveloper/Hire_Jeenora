import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import errorImg from '../../../assets/error.png'
import successImg from '../../../assets/success.png'
import { useActiveStripeAccount } from '../../../hooks/useSeller';
import '../css/Success.css';

const Success = () => {
    const navigate = useNavigate()
    const { mutate: activeAccount, isLoading: loader, isError, isSuccess, error, data } = useActiveStripeAccount();

    const queryParams = new URLSearchParams(window.location.search)
    const activeCode = queryParams.get('activeCode')

    useEffect(() => {
        if (activeCode) {
            activeAccount(activeCode)
        }
    }, [activeCode, activeAccount])

    const redirect = () => {
        navigate('/')
    }

    const errorMessage = error?.response?.data?.error || 'Something went wrong';
    const successMessage = data?.message || 'Success';

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            {
                loader ? <FadeLoader /> : isError ? <>
                    <img src={errorImg} alt='' />
                    <p className="text-red-600">{errorMessage}</p>
                    <button onClick={redirect} className='px-5 py-2 bg-green-700 rounded-sm text-white'>Back To Dashboard</button>
                </> : isSuccess && <>
                    <img src={successImg} alt='' />
                    <p className="text-green-600">{successMessage}</p>
                    <button onClick={redirect} className='px-5 py-2 bg-green-700 rounded-sm text-white'>Back To Dashboard</button>
                </>
            }
        </div>
    );
};

export default Success;

