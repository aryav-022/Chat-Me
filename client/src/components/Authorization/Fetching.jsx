import animationData from '../../lotties/fetching.json';
import Lottie from 'react-lottie';

export default function Fetching({ step }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="form-control flex gap-3 items-center h-full w-full justify-center">
            <Lottie
                options={defaultOptions}
                height={250}
                width={280}
            />
            <div className='text-center text-2xl'>Getting Things Ready!</div>
        </div>
    )
}
