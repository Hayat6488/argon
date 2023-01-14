import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {useFileUpload} from "use-file-upload";
import {localServer} from "../../../api/baseURL.json";
import NotifyContext from "../../../context/NotifyContext";
import {getAllBranch, updateOneBranch} from "../../../network/branch/loadBranch";
import {defaultPage, defaultSearchTerm, defaultShowPerPage} from "../../../constants/defaultTableHelper.json";
import {updateOneSession} from "../../../network/manageSession/apiManageSession";
import moment from "moment";

const EditSession = ({data}) => {
    const [branchName,setBranchName] = React.useState("");
    const [branchId,setBranchId] = React.useState("");
    const [sessionName,setSessionName] = React.useState("");
    const [startDate,setStartDate] = React.useState("");
    const [endDate,setEndDate] = React.useState("");
    const [status,setStatus] = React.useState("");
    const [allBranch,setAllBranch] = React.useState([]);
    const {Notify} = React.useContext(NotifyContext);

    React.useEffect(()=>{
        async function fetchData() {
            const data = await getAllBranch(defaultPage, defaultShowPerPage, defaultSearchTerm);
            await setAllBranch(data?.data);
        }
        fetchData();
    },[defaultPage, defaultShowPerPage, defaultSearchTerm]);

    const editNewSession = async () =>{
        const response = await updateOneSession(data?._id,branchName===""?data?.branchName:branchName,branchId===""?data?.branchId:branchId,sessionName===""?data?.sessionName:sessionName,startDate===""?data?.startDate:startDate,endDate===""?data?.endDate:endDate,status===""?data?.status:status);
        await Notify("success",response,"Session");
    };
    return (
        <div>
            {data && <Form>
                <FormGroup className="row">
                    <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect1"
                        md="2"
                    >
                        Branch
                    </Label>
                    <Col md="10">
                        <Input onChange={(e)=>{
                            const values = JSON.parse(e.target.value);
                            setBranchName(values?.name);
                            setBranchId(values?.id);
                        }} id="exampleFormControlSelect1" type="select">
                            <option>Select</option>
                            {allBranch.map((branch) => (
                                <option
                                    selected={branch?._id===data?.branchId && true}
                                    value={JSON.stringify({
                                        name: branch.branchName,
                                        id: branch._id,
                                    })}
                                >
                                    {branch.branchName}
                                </option>
                            ))}
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup className="row">
                    <Label
                        className="form-control-label"
                        htmlFor="example-search-input"
                        md="2"
                    >
                        Session Name
                    </Label>
                    <Col md="10">
                        <Input
                            id="example-search-input"
                            defaultValue={data?.sessionName}
                            placeholder="Session Name"
                            onChange={(e)=>setSessionName(e.target.value)}
                            type="text"
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="row">
                    <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                        md="2"
                    >
                        Start Date
                    </Label>
                    <Col md="10">
                        <Input
                            defaultValue={moment(new Date(data?.startDate)).format("yyyy-MM-DD")}
                            id="example-date-input"
                            onChange={(e)=>setStartDate(e.target.value)}
                            type="date"
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="row">
                    <Label
                        className="form-control-label"
                        htmlFor="example-date-input"
                        md="2"
                    >
                        End Date
                    </Label>
                    <Col md="10">
                        <Input
                            defaultValue={moment(new Date(data?.endDate)).format("yyyy-MM-DD")}
                            id="example-date-input"
                            onChange={(e)=>setEndDate(e.target.value)}
                            type="date"
                        />
                    </Col>
                </FormGroup>
                <FormGroup className="row">
                    <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect1"
                        md="2"
                    >
                        Status
                    </Label>
                    <Col md="10">
                        <Input onChange={(e)=>setStatus(e.target.value)} id="exampleFormControlSelect1" type="select">
                            <option>Select</option>
                            <option selected={data?.status === "active"&& true} value="active">Active</option>
                            <option selected={data?.status === "inactive"&& true} value="inactive">Inactive</option>
                        </Input>
                    </Col>
                </FormGroup>
            </Form>}
            <div className="text-right">
                <Button onClick={()=>editNewSession()} color="success">Submit</Button>
            </div>
        </div>
    );
};

export default EditSession;
