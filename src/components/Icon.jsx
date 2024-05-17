import MapIcon from '@iconscout/react-native-unicons/icons/uil-map';
import UserIcon from '@iconscout/react-native-unicons/icons/uil-user';
import CalendarIcon from '@iconscout/react-native-unicons/icons/uil-calendar-alt';
import SearchIcon from '@iconscout/react-native-unicons/icons/uil-search';
import CloseIcon from '@iconscout/react-native-unicons/icons/uil-multiply';
import FilterIcon from '@iconscout/react-native-unicons/icons/uil-filter';
import TimeIcon from '@iconscout/react-native-unicons/icons/uil-clock-eight';
import LocationIcon from '@iconscout/react-native-unicons/icons/uil-map-marker';
import WishlistIcon from '@iconscout/react-native-unicons/icons/uil-heart';
import ArrowLeft from '@iconscout/react-native-unicons/icons/uil-arrow-left';

const Icon = ({iconType, color, size}) =>{
    switch (iconType) {
        case 'map':
            return <MapIcon color={color} size={size} />;
        case 'user':
            return <UserIcon color={color} size={size} />;
        case 'calendar':
            return <CalendarIcon color={color} size={size} />;
        case 'search':
            return <SearchIcon color={color} size={size} />;
        case 'close':
            return <CloseIcon color={color} size={size} />;
        case 'filter':
            return <FilterIcon color={color} size={size} />;
        case 'time':
            return <TimeIcon color={color} size={size} />;
        case 'location':
            return <LocationIcon color={color} size={size} />;
        case 'wishlist':
            return <WishlistIcon color={color} size={size} />;
        case 'arrow-left':
            return <ArrowLeft color={color} size={size} />;
        default:
            return null;
    }
}

export default Icon;