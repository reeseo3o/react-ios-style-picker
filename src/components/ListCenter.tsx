import "../styles/ListCenter.css";

interface ListCenterProps {
  itemHeight?: number;
}

const ListCenter: React.FC<ListCenterProps> = ({ itemHeight = 50 }) => (
  <div 
    className="list-center" 
    style={{ height: `${itemHeight}px` }}
  />
);

export default ListCenter;
