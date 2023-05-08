import { Card } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormQuotes, TitleCardModal } from "~/components";
import { quoteService } from "~/services";
const item = [
    {
        title: 'Yêu cầu báo giá'
    },
    {
        title: 'Đã gửi báo giá'
    },
    {
        title: 'Đã tạo lịch hẹn'
    },
]
function QuoteEdit() {
    let { id } = useParams();
    const [quote, setQuote] = useState();
    useEffect(() => {
        const getQuote = async () => {
            setQuote((await quoteService.getById(id)).data)
        }
        getQuote();
    }, [id])
    
    return (
        <>
            <Card
                title={
                    <TitleCardModal
                        title={quote && quote.status === 0 ? 'BÁO GIÁ MỚI' : 'CẬP NHẬT THÔNG TIN'}
                        item={item}
                        current={quote ? quote.status : 0}
                    />
                }
            >
                <FormQuotes quote={quote} />
            </Card>
        </>
    );
}

export default QuoteEdit;