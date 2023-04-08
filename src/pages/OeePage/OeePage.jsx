import Card from "@/components/Card";
import SelectInput from "@/components/SelectInput";
import Button from "@/components/Button";
import Table from "@/components/Table";
function OeePage() {
    const header=['stt','name']
    const body=[]
    return ( <>
    <Card>
Chọn ngày bắt đầu:
<SelectInput/>
<Button onClick={()=>console.log('Submiting...')}>Submit</Button>
    </Card>
    <Card>
<h1>
    Giá trị OEE
</h1>
<Table header={header} body={body}
/>
    </Card>
    </> );
}

export default OeePage;