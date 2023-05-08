const routes = {
    login: '/login',
    register: '/register',
    user: {
        home: '/',
        service: '/service',
    },
    admin: {
        dashboard: '/',
        // Customer
        customerManager: '/customer',
        customerDetail: '/customer/:id',
        customerEdit: '/customer/edit/:id',
        customerAdd: '/customer/add',
        // Staff
        staffManager: '/staff',
        staffDetail: '/staff/:id',
        staffEdit: '/staff/edit/:id',
        staffAdd: '/staff/add',
        // Matter
        matterManager: '/matter',
        matterList: '/matters/:id',
        matterAdd: '/matter/add',
        matterDetail: '/matter/:id',
        matterEdit: '/matter/edit/:id',
        // Task
        taskList: '/tasks/:id',
        taskDetail: '/task/:id',
        taskAdd: '/task/add',
        // Quotes
        quotesManager: '/quote',
        quoteList: '/quotes/:id',
        quotesAdd: '/quotes/add',
        quoteDetail: '/quote/:id',
        quoteEdit: '/quote/edit/:id',
        //Calendar
        calendarManager: '/calendar',
        //Fee
        feeList: '/fees/:id',
        feeDetail: '/fee/:id',
        // Bill
        billTypeList: '/bills/type-bill/:id',
        billDetail: '/bill/:id',
        billAdd: '/bill/add/:id',
    },
    staff: {
        dashboard: '/',
        // Matter
        matterManager: '/',
        matterList: '/matters/:id',
        matterDetail: '/matter/:id',
        matterEdit: '/matter/edit/:id',
        // Task
        taskList: '/tasks/:id',
        taskListGiao: '/tasks-giao/:id',
        taskDetail: '/task/:id',
        taskAdd: '/task/add',
        // Calendar
        calendarManager: '/calendar'

    },
    tvv: {
        dashboard: '/',
        // Quotes
        quoteList: '/quotes/:id',
        quotesAdd: '/quotes/add',
        quoteDetail: '/quote/:id',
        quoteEdit: '/quote/edit/:id',
        //Calendar
        calendarManager: '/calendar',
    },
    keToan: {
        // Fee
        feeManager: '/',
        feeList: '/fees/:id',
        feeDetail: '/fee/:id',
        // Bill
        billTypeList: '/bills/type-bill/:id',
        billDetail: '/bill/:id',
        billAdd: '/bill/add/:id',
        // Matter
        matterList: '/matters/:id',
        matterDetail: '/matter/:id'
    }
}
export default routes;