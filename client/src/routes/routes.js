import config from "~/config/config"
import LayoutAdmin from "~/layouts/LayoutAdmin"
import CustomerAdd from "~/pages/managers/users/CustomerCrud/CustomerAdd"
import CustomerDetail from "~/pages/managers/users/UserDetail"
import CustomerEdit from "~/pages/managers/users/CustomerCrud/CustomerEdit"
import CustomerManager from "~/pages/managers/users/CustomerManager"
import Matter from "~/pages/managers/matters/MatterManager"
import MatterAdd from "~/pages/managers/matters/MatterAdd"
import StaffManager from "~/pages/managers/users/StaffManager"
import StaffEdit from "~/pages/managers/users/StaffCrud/StaffEdit"
import StaffAdd from "~/pages/managers/users/StaffCrud/StaffAdd"
import QuotesManager from "~/pages/managers/quotes/QuotesManager"
import QuotesAdd from "~/pages/managers/quotes/QuotesAdd"
import HomePage from "~/pages/user/HomePage"
import UserLayout from "~/layouts/UserLayout/UserLayout"
import QuoteDetail from "~/pages/managers/quotes/QuoteDetail"
import QuoteEdit from "~/pages/managers/quotes/QuoteEdit"
import CalendarManager from "~/pages/managers/calendars/CalendarManager"
import MatterList from "~/pages/managers/matters/MatterList"
import MatterDetail from "~/pages/managers/matters/MatterDetail"
import MatterEdit from "~/pages/managers/matters/MatterEdit"
import LoginPage from "~/pages/auth/LoginPage"
import FeeManager from "~/pages/managers/fees/FeeManager"
import TaskList from "~/pages/managers/tasks/TaskList"
import FeeList from "~/pages/managers/fees/FeeList"
import FeeDetail from "~/pages/managers/fees/FeeDetail"
import TaskDetail from "~/pages/managers/tasks/TaskDetail"
import TaskAdd from "~/pages/managers/tasks/TaskAdd"
import QuoteList from "~/pages/managers/quotes/QuoteList"
import MatterManager from "~/pages/managers/matters/MatterManager"
import Manager from "~/pages/managers/Manager"
import TaskListGiao from "~/pages/managers/tasks/TaskListGiao"
import BillList from "~/pages/managers/bills/BillList"
import BillDetail from "~/pages/managers/bills/BillDetail"
import BillCreate from "~/pages/managers/bills/BillCreate"

const publicRoutes = [
    { path: config.routes.login, component: LoginPage, layout: UserLayout },
    { path: config.routes.user.home, component: HomePage, layout: UserLayout },
]

const privateRoutes = [
    // Dashboard
    { path: config.routes.admin.dashboard, component: Manager, layout: LayoutAdmin },
    // Customer
    { path: config.routes.admin.customerManager, component: CustomerManager, layout: LayoutAdmin },
    { path: config.routes.admin.customerDetail, component: CustomerDetail, layout: LayoutAdmin },
    { path: config.routes.admin.customerEdit, component: CustomerEdit, layout: LayoutAdmin },
    { path: config.routes.admin.customerAdd, component: CustomerAdd, layout: LayoutAdmin },
    // Staff
    { path: config.routes.admin.staffManager, component: StaffManager, layout: LayoutAdmin },
    { path: config.routes.admin.staffDetail, component: CustomerDetail, layout: LayoutAdmin },
    { path: config.routes.admin.staffEdit, component: StaffEdit, layout: LayoutAdmin },
    { path: config.routes.admin.staffAdd, component: StaffAdd, layout: LayoutAdmin },
    // Matter
    { path: config.routes.admin.matterManager, component: Matter, layout: LayoutAdmin },
    { path: config.routes.admin.matterAdd, component: MatterAdd, layout: LayoutAdmin },
    { path: config.routes.admin.matterList, component: MatterList, layout: LayoutAdmin },
    { path: config.routes.admin.matterDetail, component: MatterDetail, layout: LayoutAdmin },
    { path: config.routes.admin.matterEdit, component: MatterEdit, layout: LayoutAdmin },
     // Task
     { path: config.routes.admin.taskList, component: TaskList, layout: LayoutAdmin },
     { path: config.routes.admin.taskDetail, component: TaskDetail, layout: LayoutAdmin },
     { path: config.routes.admin.taskAdd, component: TaskAdd, layout: LayoutAdmin },
    //Quotes
    { path: config.routes.admin.quotesManager, component: QuotesManager, layout: LayoutAdmin },
    { path: config.routes.admin.quoteList, component: QuoteList, layout: LayoutAdmin },
    { path: config.routes.admin.quotesAdd, component: QuotesAdd, layout: LayoutAdmin },
    { path: config.routes.admin.quoteDetail, component: QuoteDetail, layout: LayoutAdmin },
    { path: config.routes.admin.quoteEdit, component: QuoteEdit, layout: LayoutAdmin },
    //Calendar
    { path: config.routes.admin.calendarManager, component: CalendarManager, layout: LayoutAdmin },
    //Fee
    { path: config.routes.admin.feeList, component: FeeList, layout: LayoutAdmin },
    { path: config.routes.admin.feeDetail, component: FeeDetail, layout: LayoutAdmin }, 
    // Bill
    { path: config.routes.admin.billTypeList, component: BillList, layout: LayoutAdmin },
    { path: config.routes.admin.billDetail, component: BillDetail, layout: LayoutAdmin },
    { path: config.routes.admin.billAdd, component: BillCreate, layout: LayoutAdmin },
]
const staffRouter = [
    // Dashboard
    { path: config.routes.admin.dashboard, component: MatterManager, layout: LayoutAdmin },
    // Matter
    { path: config.routes.staff.matterList, component: MatterList, layout: LayoutAdmin },
    { path: config.routes.staff.matterManager, component: Matter, layout: LayoutAdmin },
    { path: config.routes.staff.matterDetail, component: MatterDetail, layout: LayoutAdmin },
    { path: config.routes.staff.matterEdit, component: MatterEdit, layout: LayoutAdmin },
    // Task
    { path: config.routes.staff.taskList, component: TaskList, layout: LayoutAdmin },
    { path: config.routes.staff.taskListGiao, component: TaskListGiao, layout: LayoutAdmin },
    { path: config.routes.staff.taskDetail, component: TaskDetail, layout: LayoutAdmin },
    // Calendar
    { path: config.routes.staff.calendarManager, component: CalendarManager, layout: LayoutAdmin },

]
const TuVanVienRouter = [
    // Dashboard
    { path: config.routes.tvv.dashboard, component: QuotesManager, layout: LayoutAdmin },
    //Quotes
    { path: config.routes.tvv.quoteList, component: QuoteList, layout: LayoutAdmin },
    { path: config.routes.tvv.quotesAdd, component: QuotesAdd, layout: LayoutAdmin },
    { path: config.routes.tvv.quoteDetail, component: QuoteDetail, layout: LayoutAdmin },
    { path: config.routes.tvv.quoteEdit, component: QuoteEdit, layout: LayoutAdmin },
    //Calendar
    { path: config.routes.tvv.calendarManager, component: CalendarManager, layout: LayoutAdmin },
]
const KeToanRouter = [
    // Dashboard
    { path: config.routes.keToan.feeManager, component: FeeManager, layout: LayoutAdmin },
    // Fee
    { path: config.routes.keToan.feeList, component: FeeList, layout: LayoutAdmin },
    { path: config.routes.keToan.feeDetail, component: FeeDetail, layout: LayoutAdmin },
    // Bill
    { path: config.routes.keToan.billTypeList, component: BillList, layout: LayoutAdmin },
    { path: config.routes.keToan.billDetail, component: BillDetail, layout: LayoutAdmin },
    { path: config.routes.keToan.billAdd, component: BillCreate, layout: LayoutAdmin },
    // Matter
    { path: config.routes.keToan.matterList, component: MatterList, layout: LayoutAdmin },
    { path: config.routes.keToan.matterDetail, component: MatterDetail, layout: LayoutAdmin },

]

export { privateRoutes, publicRoutes, staffRouter, TuVanVienRouter, KeToanRouter }