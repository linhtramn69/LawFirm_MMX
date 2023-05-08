const avatar = {
    user:  require('~/assets/images/avatar/user.png'),
    company: require('~/assets/images/avatar/company.png'),
    tuvan: require('~/assets/images/avatar/tuvan.png'),
}
const icon ={
    user:  require('~/assets/images/icon/managerUser.png'),
}
const banner = {
    bannerTop: require('./banner/banner_top.png'),
    bannerSecond: require('./banner/banner_second.png'),
    bannerThird: require('./banner/banner_third.png'),
    bannerFifth: require('./banner/banner_fifth.png'),
}

const service = [
    {
        img: require('./icon/dan_su.png'),
        title: 'Dân sự'
    },
    {
        img: require('./icon/dat_dai.png'),
        title: 'Đất đai'
    },
    {
        img: require('./icon/hop_dong.png'),
        title: 'Hợp đồng'
    },
    {
        img: require('./icon/doanh_nghiep.png'),
        title: 'Doanh nghiệp'
    },
    {
        img: require('./icon/hon_nhan.png'),
        title: 'Hôn nhân'
    },
    {
        img: require('./icon/lao_dong.png'),
        title: 'Lao động'
    },
]

const attribute = [
    {
        img: require('./icon/to_tung.png'),
        title: 'Vụ việc tố tụng',
        description: '1392',
        classParent: 'col-blue',
        classChildren: 'card-children'
    },
    {
        img: require('./icon/khach_hang.png'),
        title: 'Khách hàng các nhân',
        description: '11599',
        classParent: 'col-white',
        classChildren: 'card-children'

    },
    {
        img: require('./icon/doanh_nghiep_1.png'),
        title: 'Doanh nghiệp',
        description: '1',
        classParent: 'col-white',
        classChildren: 'card-children'
    },
    
    {
        img: require('./icon/kinh_nghiem.png'),
        title: 'Năm kinh nghiệm',
        description: '12',
        classParent: 'col-blue',
        classChildren: 'card-children'
    }
    
]
const logo = {
    logo: require('./logo/logo.png')
}
export { avatar, icon, banner, service, attribute, logo };