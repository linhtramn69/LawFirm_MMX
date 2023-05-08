import {  Card } from "antd";
import { useEffect } from "react";
import FormMatter from "~/components/AdminComponents/Form/Matter";
import TitleCardModal from "~/components/AdminComponents/TitleCardModal";
import { actions, useStore } from "~/store";

function MatterAdd() {
    const [state, dispatch] = useStore();
    // useEffect(() => {
    //     dispatch(actions.setTasks([]))
    //     dispatch(actions.setFees([]))
    // }, [])
    return (
        <>
            <Card
                title={
                   <TitleCardModal title="Thêm vụ việc" current={1}/>
                }>
                <FormMatter />
            </Card>
        </>
    );
}

export default MatterAdd;