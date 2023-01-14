import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {getAllBranch} from "../../../network/branch/loadBranch";
import {defaultPage,defaultShowPerPage,defaultSearchTerm} from "../../../constants/defaultTableHelper.json";
import {addSession} from "../../../network/manageSession/apiManageSession";
import NotifyContext from "../../../context/NotifyContext";

const AddSession = () => {
    const [branchName,setBranchName] = React.useState("");
    const [branchId,setBranchId] = React.useState("");
    const [sessionName,setSession] = React.useState("");
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
    },[]);

    const handleAddSession = async () =>{
        const response = await addSession(branchName,branchId,sessionName,startDate,endDate,status);
        Notify("success",response?.message,"Session");
        if (response?.message==="Successfully Added"){
            setBranchName("");
            setBranchId("");
            setSession("");
            setStartDate("");
            setEndDate("");
            setStatus("");
        }
        console.log(response);
    }

    return (
        <div>
            <Form>
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
                            <option selected={(branchName==="" && branchId==="")&& true}>Select</option>
                            {allBranch.map((branch) => (
                                <option
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
                        htmlFor="example-text-input"
                        md="2"
                    >
                        Session Name
                    </Label>
                    <Col md="10">
                        <Input
                            placeholder="Type Branch Name"
                            value={sessionName}
                            onChange={(e)=>setSession(e.target.value)}
                            id="example-text-input"
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
                            value={startDate}
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
                            value={endDate}
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
                        <option selected={status===""&&true} >Select</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Input>
                    </Col>
                </FormGroup>

            </Form>
            <div className="text-right">
                <Button onClick={handleAddSession} color="success">Submit</Button>
            </div>
        </div>
    );
};

export default AddSession;
