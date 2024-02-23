import { useLoading } from "../stores/useLoading";

export const LoadingSpin: React.FC = () => {

    const {isLoad} = useLoading((state) => state);

    return (
        <>
        {
            isLoad &&   <div className="loading">
            <span className="loader"></span>
            </div>
        }
        
        </>
      
    )
}