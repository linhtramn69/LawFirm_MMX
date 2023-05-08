import { Card } from "antd";
import { FormQuotes } from "~/components";
import TitleCardModal from "~/components/AdminComponents/TitleCardModal";

function QuotesAdd() {


    return (
        <>
            <Card
                title={
                    <TitleCardModal title="BÁO GIÁ MỚI" />
                }
            >
                <FormQuotes/>
            </Card>
        </>
    );
}

export default QuotesAdd;