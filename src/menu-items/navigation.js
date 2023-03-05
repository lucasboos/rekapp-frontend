// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined
};


const navigation = {
    id: 'group-navigation',
    title: 'Navegação',
    type: 'group',
    children: [
        {
            id: 'machine',
            title: 'Colaboradores',
            type: 'item',
            url: '/',
            icon: icons.UserOutlined,
            breadcrumbs: false
        }
    ]
};

export default navigation;
