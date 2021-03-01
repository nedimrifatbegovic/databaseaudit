import {
  updateConfig as APIUpdateConfig,
  SetNewConfig,
  checkConfig,
} from "./api/SetNewConfig";
import { Col, Form, Row, Spinner, Table } from "react-bootstrap";
import {
  ConfigCheckInterface,
  IAPIUpdateConfig,
  IInternalConfig,
  INewConfig,
  INewConfigAPI,
  IUpdateForm,
} from "../../assets/interfaces/Interfaces";
import React, { useEffect, useState } from "react";
import { description, inputFields } from "./InternalConfig.resources";

import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { CustomLink } from "../../style/CustomLink";
import { FileUpload } from "../FileUpload/FileUpload.styled";
import { Label } from "../../style/Label";
import { paths } from "../../App/AppRouter.resources";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

// * Style of the balanced scorecards table
const StyledTable = styled(Table)`
  overflow-x: auto;
  white-space: nowrap;

  @media only screen and (max-width: 767px) {
    display: block;
  }
`;

export default function InternalConfig(props: IInternalConfig) {
  const [loading, setLoading] = useState<boolean | undefined>();
  const [loadedConfig, setloadedConfig] = useState<
    ConfigCheckInterface | undefined
  >();
  const [typeState, settypeState] = useState<boolean>(false);
  const [requestState, setRequestState] = useState<boolean>(false);
  const [formatState, setformatState] = useState<boolean>(false);
  const [filenameState, setfilenameState] = useState<string>("");

  let history = useHistory();
  async function checkIfConfigExists(emailprop: string) {
    const data = {
      email: emailprop,
    };

    const configstatus: ConfigCheckInterface | any = await checkConfig(data);

    if (configstatus !== undefined && configstatus.loaded === true) {
      setLoading(true);
      setloadedConfig(configstatus);
      console.log(configstatus);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkIfConfigExists(props.email);
  }, [props.email]);

  const { register, handleSubmit, errors } = useForm();

  async function getConfigNewData(data: INewConfig) {
    setformatState(false);
    setfilenameState("");
    setRequestState(false);

    // pem file to base64

    var file: File = data.privatekey[0];
    var base64pem = await toBase64(file);

    const input: INewConfigAPI = {
      configdata: data,
      privatekeybase64: base64pem,
      internalMail: props.email,
    };

    SetNewConfig(input);
    setRequestState(true);
  }

  // Convert File to Base64
  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function updateConfigData(data: IUpdateForm) {
    setRequestState(false);

    if (data.updatevalue === undefined || data.updatevalue === null) {
      if (
        data.updateprivatekey !== undefined &&
        data.updateprivatekey[0] !== undefined
      ) {
        var file: File = data.updateprivatekey[0];
        var base64pem = await toBase64(file);
        const updateConfig: IAPIUpdateConfig = {
          email: props.email,
          attributeName: data.updatetype,
          attributeValue: base64pem,
        };
        APIUpdateConfig(updateConfig);
        setRequestState(true);
      }
    } else {
      const updateConfig = {
        email: props.email,
        attributeName: data.updatetype,
        attributeValue: data.updatevalue,
      };
      APIUpdateConfig(updateConfig);
      setRequestState(true);
    }
  }

  const handleChange = (type: string) => {
    setformatState(false);
    setfilenameState("");
    setRequestState(false);
    if (type === inputFields[0].attributeName) {
      // For file upload
      settypeState(false);
    } else {
      // For text fields
      settypeState(true);
    }
  };

  function handleHomepage() {
    history.push(paths.internal.home);
  }

  function handleFileuploadChange(uploadedFile: FileList | null) {
    if (
      uploadedFile !== null &&
      uploadedFile[0] !== null &&
      uploadedFile[0] !== undefined
    ) {
      var filename: string = uploadedFile[0].name;
      var ext = filename.substr(filename.lastIndexOf(".") + 1);
      if (ext === "pem") {
        setformatState(true);
        setfilenameState(filename);
      } else {
        setformatState(false);
        setfilenameState("");
      }
    }
  }

  return (
    <React.Fragment>
      <h1>{description.title}</h1>
      <hr />
      {loading === undefined ? (
        <React.Fragment>
          <Spinner animation="grow" variant="info" />
        </React.Fragment>
      ) : loading === true ? (
        <React.Fragment>
          {/* Show the current config file and user id */}
          {loadedConfig !== undefined &&
            loadedConfig.configuration !== undefined && (
              <React.Fragment>
                <p>
                  Unique Audit ID: <b>{loadedConfig.internalid}</b>
                </p>
                <hr />
              </React.Fragment>
            )}
          <Form onSubmit={handleSubmit(updateConfigData)}>
            {/* Attribute Type */}
            <Form.Group as={Row} controlId={description.updateTypeId}>
              <Form.Label column>{description.subtitleExisting}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  as="select"
                  name={description.updateTypeId}
                  ref={register}
                  onChange={(e) => handleChange(e.target.value)}
                >
                  {inputFields.map((option, index) => (
                    <option key={index} value={option.attributeName}>
                      {option.attributeLabel}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            {/* Attribute Value */}
            {typeState === true ? (
              <Form.Group as={Row} controlId={description.updateValueId}>
                <Form.Label column>
                  {description.updateValueDescription}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    style={{ marginBottom: "2vh" }}
                    placeholder={description.updateValuePlaceholder}
                    name={description.updateValueId}
                    type="text"
                    ref={register({ required: true })}
                  />
                  {errors.updatevalue && (
                    <p>
                      <b>{description.updateValueError}</b>
                    </p>
                  )}
                </Col>
              </Form.Group>
            ) : (
              <Form.Group as={Row} controlId={description.updatePrivatekey}>
                <Form.Label column>
                  {description.updateValueDescription}
                </Form.Label>
                <Col sm="10">
                  <FileUpload>
                    <input
                      type="file"
                      onChange={(e) => handleFileuploadChange(e.target.files)}
                      ref={register({ required: true })}
                      name={description.updatePrivatekey}
                      accept=".pem"
                    />
                    <BsFileEarmarkArrowUp size={32} /> Upload file (*.pem)
                  </FileUpload>
                  {formatState === true ? (
                    <Row>
                      <b>Uploaded file: {filenameState}</b>
                    </Row>
                  ) : (
                    <Row>
                      <b>Please upload a file with the .pem ending</b>
                    </Row>
                  )}
                  {errors.privatekey && (
                    <p>
                      <b>{description.updateValueError}</b>
                    </p>
                  )}
                </Col>
              </Form.Group>
            )}
            {/* -- Submit the updated value -- */}
            <Row className="justify-content-center">
              <CustomLink type="submit" value="Submit" />
            </Row>

            {requestState === true ? (
              <React.Fragment>
                <hr />
                <Row className="justify-content-left">
                  <p>
                    <b>Your request has been sent!</b>
                  </p>
                </Row>
                <Row className="justify-content-left">
                  <CustomLink
                    type="submit"
                    value="Back to Home Page"
                    onClick={handleHomepage}
                  />
                </Row>
              </React.Fragment>
            ) : (
              ""
            )}
          </Form>
          {loadedConfig !== undefined &&
            loadedConfig.configuration !== undefined && (
              <React.Fragment>
                <hr />
                <h4>Current Configuration Data</h4>
                <StyledTable striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Config Field</th>
                      <th>Current Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{description.consumerKeyLabel}</td>
                      <td>{loadedConfig.configuration.consumerKey}</td>
                    </tr>
                    <tr>
                      <td>{description.tokenLabel}</td>
                      <td>{loadedConfig.configuration.token}</td>
                    </tr>
                    <tr>
                      <td>{description.tokenSecretLabel}</td>
                      <td>{loadedConfig.configuration.tokenSecret}</td>
                    </tr>
                    <tr>
                      <td>{description.signatureMethodLabel}</td>
                      <td>{loadedConfig.configuration.signatureMethod}</td>
                    </tr>
                    <tr>
                      <td>{description.jiraurlLabel}</td>
                      <td>{loadedConfig.configuration.jiraUrl}</td>
                    </tr>
                    <tr>
                      <td>{description.jiraportLabel}</td>
                      <td>{loadedConfig.configuration.jiraPort}</td>
                    </tr>
                    <tr>
                      <td>{description.backupProjectLabel}</td>
                      <td>{loadedConfig.configuration.backupProjectKey}</td>
                    </tr>
                    <tr>
                      <td>{description.restorationProjectLabel}</td>
                      <td>
                        {loadedConfig.configuration.restorationProjectKey}
                      </td>
                    </tr>

                    <tr>
                      <td>{description.errorProjectLabel}</td>
                      <td>{loadedConfig.configuration.errorProjectKey}</td>
                    </tr>
                    <tr>
                      <td>{description.changeProjectLabel}</td>
                      <td>{loadedConfig.configuration.changeProjectKey}</td>
                    </tr>
                    <tr>
                      <td>{description.dbtypeLabel}</td>
                      <td>{loadedConfig.configuration.dbType}</td>
                    </tr>
                    <tr>
                      <td>{description.dbhostLabel}</td>
                      <td>{loadedConfig.configuration.dbHost}</td>
                    </tr>

                    <tr>
                      <td>{description.dbportLabel}</td>
                      <td>{loadedConfig.configuration.dbPort}</td>
                    </tr>
                    <tr>
                      <td>{description.dbuserLabel}</td>
                      <td>{loadedConfig.configuration.dbUsername}</td>
                    </tr>
                    <tr>
                      <td>{description.dbuserpasswordLabel}</td>
                      <td>{loadedConfig.configuration.dbPassword}</td>
                    </tr>
                    <tr>
                      <td>{description.dbnameLabel}</td>
                      <td>{loadedConfig.configuration.dbName}</td>
                    </tr>
                    <tr>
                      <td>{description.logsClassNameLabel}</td>
                      <td>{loadedConfig.configuration.logs}</td>
                    </tr>

                    <tr>
                      <td>{description.logsLogIDLabel}</td>
                      <td>{loadedConfig.configuration.logsid}</td>
                    </tr>
                    <tr>
                      <td>{description.logsProjectKeyLabel}</td>
                      <td>{loadedConfig.configuration.projectkey}</td>
                    </tr>
                    <tr>
                      <td>{description.logsTicketKeyLabel}</td>
                      <td>{loadedConfig.configuration.ticketkey}</td>
                    </tr>
                    <tr>
                      <td>{description.logsTypeLabel}</td>
                      <td>{loadedConfig.configuration.logstype}</td>
                    </tr>
                    <tr>
                      <td>{description.userClassNameLabel}</td>
                      <td>{loadedConfig.configuration.user}</td>
                    </tr>
                    <tr>
                      <td>{description.userUserIdLabel}</td>
                      <td>{loadedConfig.configuration.userid}</td>
                    </tr>

                    <tr>
                      <td>{description.userFirstnameLabel}</td>
                      <td>{loadedConfig.configuration.firstname}</td>
                    </tr>
                    <tr>
                      <td>{description.userLastnameLabel}</td>
                      <td>{loadedConfig.configuration.lastname}</td>
                    </tr>
                    <tr>
                      <td>{description.userEmailLabel}</td>
                      <td>{loadedConfig.configuration.email}</td>
                    </tr>
                    <tr>
                      <td>{description.userPasswordLabel}</td>
                      <td>{loadedConfig.configuration.password}</td>
                    </tr>
                    <tr>
                      <td>{description.userUsergroupIdLabel}</td>
                      <td>{loadedConfig.configuration.usergroupid}</td>
                    </tr>
                    <tr>
                      <td>{description.userTitleLabel}</td>
                      <td>{loadedConfig.configuration.title}</td>
                    </tr>
                    <tr>
                      <td>{description.usergroupClassNameLabel}</td>
                      <td>{loadedConfig.configuration.usergroups}</td>
                    </tr>

                    <tr>
                      <td>{description.usergroupGroupIdLabel}</td>
                      <td>{loadedConfig.configuration.usergroupsgroupid}</td>
                    </tr>
                    <tr>
                      <td>{description.usergroupReadRightsLabel}</td>
                      <td>{loadedConfig.configuration.readrights}</td>
                    </tr>
                    <tr>
                      <td>{description.usergroupDeleteRightsLabel}</td>
                      <td>{loadedConfig.configuration.deleterights}</td>
                    </tr>
                    <tr>
                      <td>{description.usergroupCreateRightsLabel}</td>
                      <td>{loadedConfig.configuration.createrights}</td>
                    </tr>
                    <tr>
                      <td>{description.usergroupUpdateRightsLabel}</td>
                      <td>{loadedConfig.configuration.updaterights}</td>
                    </tr>
                    <tr>
                      <td>{description.usergroupGroupNameLabel}</td>
                      <td>{loadedConfig.configuration.groupname}</td>
                    </tr>
                  </tbody>
                </StyledTable>
              </React.Fragment>
            )}
        </React.Fragment>
      ) : (
        //  Check if there is a config for email "x..."
        //  If YES enable edit of configuration
        // * Select attribute
        // * Add / Upload new value
        // * Save new value in DB
        // ! If NO enable creation of the configuration
        // * Elements of the config:
        // * Upload Files: private key (jira)
        // * Insert Fields: consumer key (jira), token (jira), token secret (jira), signature method (jira), jira url (jira), jira port (jira),
        // * backup / restoration / error / change project key (jira), db type, db host, db port, db username, db password
        // ** Database Fields:
        // *** logs (LogID, ProjectKey, TicketKey, Type)
        // *** user (UserID, FirstName, LastName, Email, Password, UserGroupID, Title)
        // *** usergroups (GroupID, ReadRights, DeleteRights, CreateRights, UpdateRights, GroupName)
        <React.Fragment>
          <Form onSubmit={handleSubmit(getConfigNewData)}>
            <Label>
              <b>{description.subtitleNone}</b>
            </Label>
            <hr />
            {/* -- Jira Input -- */}
            <Label>
              <b>{description.jiraSubtitle}</b>
            </Label>
            {/* Private Key (Jira) */}
            <Form.Group as={Row} controlId={description.namePrivatekey}>
              <Form.Label column>
                {description.updateValueDescription}
              </Form.Label>
              <Col sm="10">
                <FileUpload>
                  <input
                    type="file"
                    onChange={(e) => handleFileuploadChange(e.target.files)}
                    ref={register({ required: true })}
                    name={description.namePrivatekey}
                    accept=".pem"
                  />
                  <BsFileEarmarkArrowUp size={32} /> Upload file (*.pem)
                </FileUpload>
                {formatState === true ? (
                  <Row>
                    <b>Uploaded file: {filenameState}</b>
                  </Row>
                ) : (
                  <Row>
                    <b>Please upload a file with the .pem ending</b>
                  </Row>
                )}
                {errors.privatekey && (
                  <p>
                    <b>{description.errorPrivatekey}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Consumer Key (Jira) */}
            <Form.Group as={Row} controlId={description.nameConsumerKey}>
              <Form.Label column>{description.consumerKeyLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.consumerKeyPlaceholder}
                  name={description.nameConsumerKey}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.consumerkey && (
                  <p>
                    <b>{description.errorConsumerKey}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Token (Jira) */}
            <Form.Group as={Row} controlId={description.nameToken}>
              <Form.Label column>{description.tokenLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.tokenPlaceholder}
                  name={description.nameToken}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.token && (
                  <p>
                    <b>{description.errorToken}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Token Secret (Jira) */}
            <Form.Group as={Row} controlId={description.nameTokenSecret}>
              <Form.Label column>{description.tokenSecretLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.tokenSecretPlaceholder}
                  name={description.nameTokenSecret}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.tokensecret && (
                  <p>
                    <b>{description.errorTokenSecret}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Signature Method (Jira) */}
            <Form.Group as={Row} controlId={description.nameSignatureMethod}>
              <Form.Label column>{description.signatureMethodLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  as="select"
                  name={description.nameSignatureMethod}
                  ref={register}
                >
                  <option value={description.signatureMethodOption}>
                    {description.signatureMethodOption}
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>
            {/* Jira Url (Jira) */}
            <Form.Group as={Row} controlId={description.nameJiraUrl}>
              <Form.Label column>{description.jiraurlLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.jiraurlPlaceholder}
                  name={description.nameJiraUrl}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.jiraurl && (
                  <p>
                    <b>{description.errorJiraUrl}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Jira Port (Jira) */}
            <Form.Group as={Row} controlId={description.nameJiraPort}>
              <Form.Label column>{description.jiraportLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.jiraportPlaceholder}
                  name={description.nameJiraPort}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.jiraport && (
                  <p>
                    <b>{description.errorJiraPort}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Jira Backup Project */}
            <Form.Group as={Row} controlId={description.nameBackup}>
              <Form.Label column>{description.backupProjectLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.backupProjectPlaceholder}
                  name={description.nameBackup}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.backup && (
                  <p>
                    <b>{description.errorBackup}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Jira Restoration Project */}
            <Form.Group as={Row} controlId={description.nameRestoration}>
              <Form.Label column>
                {description.restorationProjectLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.restorationProjectPlaceholder}
                  name={description.nameRestoration}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.restoration && (
                  <p>
                    <b>{description.errorRestoration}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Jira Error Project */}
            <Form.Group as={Row} controlId={description.nameError}>
              <Form.Label column>{description.errorProjectLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.errorProjectPlaceholder}
                  name={description.nameError}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.error && (
                  <p>
                    <b>{description.errorError}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Jira Change Project */}
            <Form.Group as={Row} controlId={description.nameChange}>
              <Form.Label column>{description.changeProjectLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.changeProjectPlaceholder}
                  name={description.nameChange}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.change && (
                  <p>
                    <b>{description.errorChange}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            <hr />
            {/* -- Database Input -- */}
            <Label>
              <b>{description.databaseSubtitle}</b>
            </Label>
            {/* DB Type */}
            <Form.Group as={Row} controlId={description.nameDbType}>
              <Form.Label column>{description.dbtypeLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  as="select"
                  name={description.nameDbType}
                  ref={register}
                >
                  <option value={description.dbtypeOption}>
                    {description.dbtypeOption}
                  </option>
                </Form.Control>
              </Col>
            </Form.Group>
            {/* DB Host */}
            <Form.Group as={Row} controlId={description.nameDbHost}>
              <Form.Label column>{description.dbhostLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.dbhostPlaceholder}
                  name={description.nameDbHost}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.dbhost && (
                  <p>
                    <b>{description.errorDbHost}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* DB Port */}
            <Form.Group as={Row} controlId={description.nameDbPort}>
              <Form.Label column>{description.dbportLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.dbportPlaceholder}
                  name={description.nameDbPort}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.dbport && (
                  <p>
                    <b>{description.errorDbPort}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* DB User */}
            <Form.Group as={Row} controlId={description.nameDbUsername}>
              <Form.Label column>{description.dbuserLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.dbuserPlaceholder}
                  name={description.nameDbUsername}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.dbusername && (
                  <p>
                    <b>{description.errorDbUserName}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* DB Password */}
            <Form.Group as={Row} controlId={description.nameDbPassword}>
              <Form.Label column>{description.dbuserpasswordLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.dbuserpasswordPlaceholder}
                  name={description.nameDbPassword}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.dbpassword && (
                  <p>
                    <b>{description.errorDbPassword}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* DB Name */}
            <Form.Group as={Row} controlId={description.nameDbName}>
              <Form.Label column>{description.dbnameLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.dbnamePlaceholder}
                  name={description.nameDbName}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.dbname && (
                  <p>
                    <b>{description.errorDbName}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            <hr />
            {/* -- DB Classes Input -- */}
            <Label>
              <b>{description.databaseClassesSubtitle}</b>
            </Label>
            {/* Logs - Class Name */}
            <Form.Group as={Row} controlId={description.nameLogs}>
              <Form.Label column>{description.logsClassNameLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.logsClassNamePlaceholder}
                  name={description.nameLogs}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.logs && (
                  <p>
                    <b>{description.errorLogs}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/*  Logs - Log ID - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameLogsLogsId}>
              <Form.Label column>{description.logsLogIDLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.logsLogIDPlaceholder}
                  name={description.nameLogsLogsId}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.logsid && (
                  <p>
                    <b>{description.errorLogsLogsId}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Logs - Project Key - Attribute Name  */}
            <Form.Group as={Row} controlId={description.nameLogsProjectKey}>
              <Form.Label column>{description.logsProjectKeyLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.logsProjectKeyPlaceholder}
                  name={description.nameLogsProjectKey}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.projectkey && (
                  <p>
                    <b>{description.errorLogsProjectKey}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Logs - Ticket Key - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameLogsTicketKey}>
              <Form.Label column>{description.logsTicketKeyLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.logsTicketKeyPlaceholder}
                  name={description.nameLogsTicketKey}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.ticketkey && (
                  <p>
                    <b>{description.errorLogsTicketKey}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* Logs - Type - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameLogsType}>
              <Form.Label column>{description.logsTypeLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.logsTypePlaceholder}
                  name={description.nameLogsType}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.logstype && (
                  <p>
                    <b>{description.errorLogsType}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - Class Name */}
            <Form.Group as={Row} controlId={description.nameUser}>
              <Form.Label column>{description.userClassNameLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userClassNamePlaceholder}
                  name={description.nameUser}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.user && (
                  <p>
                    <b>{description.errorUser}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - User ID - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameUserUserId}>
              <Form.Label column>{description.userUserIdLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userUserIdPlaceholder}
                  name={description.nameUserUserId}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.userid && (
                  <p>
                    <b>{description.errorUserUserId}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - First Name - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameUserFirstName}>
              <Form.Label column>{description.userFirstnameLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userFirstnamePlaceholder}
                  name={description.nameUserFirstName}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.firstname && (
                  <p>
                    <b>{description.errorUserFirstname}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - Last Name - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameUserLastName}>
              <Form.Label column>{description.userLastnameLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userLastnamePlaceholder}
                  name={description.nameUserLastName}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.lastname && (
                  <p>
                    <b>{description.errorUserLastname}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - Email - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameUserEmail}>
              <Form.Label column>{description.userEmailLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userEmailPlaceholder}
                  name={description.nameUserEmail}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.email && (
                  <p>
                    <b>{description.errorUserEmail}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - Password - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameUserPassword}>
              <Form.Label column>{description.userPasswordLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userPasswordPlaceholder}
                  name={description.nameUserPassword}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.password && (
                  <p>
                    <b>{description.errorUserPassword}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - User Group - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameUserUserGroupId}>
              <Form.Label column>{description.userUsergroupIdLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userUsergroupIdPlaceholder}
                  name={description.nameUserUserGroupId}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.usergroupid && (
                  <p>
                    <b>{description.errorUserUserGroupId}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* User - Title - Attribute Name */}
            <Form.Group as={Row} controlId={description.nameUserTitle}>
              <Form.Label column>{description.userTitleLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.userTitlePlaceholder}
                  name={description.nameUserTitle}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.title && (
                  <p>
                    <b>{description.errorUserTitle}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- User Group Class Name -- */}
            <Form.Group as={Row} controlId={description.nameUserGroups}>
              <Form.Label column>
                {description.usergroupClassNameLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.usergroupClassNamePlaceholder}
                  name={description.nameUserGroups}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.usergroups && (
                  <p>
                    <b>{description.errorUserGroups}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- User Group - Group Id - Attribute Name -- */}
            <Form.Group as={Row} controlId={description.nameUserGroupsGroupId}>
              <Form.Label column>
                {description.usergroupGroupIdLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.usergroupGroupIdPlaceholder}
                  name={description.nameUserGroupsGroupId}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.usergroupsgroupid && (
                  <p>
                    <b>{description.errorUserGroupsGroupId}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- User Group - Read Rights - Attribute Name -- */}
            <Form.Group
              as={Row}
              controlId={description.nameUserGroupsReadRights}
            >
              <Form.Label column>
                {description.usergroupReadRightsLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.usergroupReadRightsPlaceholder}
                  name={description.nameUserGroupsReadRights}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.readrights && (
                  <p>
                    <b>{description.errorUserGroupsReadRights}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- User Group - Delete Rights - Attribute Name -- */}
            <Form.Group
              as={Row}
              controlId={description.nameUserGroupsDeleteRights}
            >
              <Form.Label column>
                {description.usergroupDeleteRightsLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.usergroupDeleteRightsPlaceholder}
                  name={description.nameUserGroupsDeleteRights}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.deleterights && (
                  <p>
                    <b>{description.errorUserGroupsDeleteRights}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- User Group - Create Rights - Attribute Name -- */}
            <Form.Group
              as={Row}
              controlId={description.nameUserGroupsCreateRights}
            >
              <Form.Label column>
                {description.usergroupCreateRightsLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.usergroupCreateRightsPlaceholder}
                  name={description.nameUserGroupsCreateRights}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.createrights && (
                  <p>
                    <b>{description.errorUserGroupsCreateRights}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- User Group - Update Rights - Attribute Name */}
            <Form.Group
              as={Row}
              controlId={description.nameUserGroupsUpdateRights}
            >
              <Form.Label column>
                {description.usergroupUpdateRightsLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.usergroupUpdateRightsPlaceholder}
                  name={description.nameUserGroupsUpdateRights}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.updaterights && (
                  <p>
                    <b>{description.errorUserGroupsUpdateRights}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- User Group - Group Name - Attribute Name -- */}
            <Form.Group
              as={Row}
              controlId={description.nameUserGroupsGroupName}
            >
              <Form.Label column>
                {description.usergroupGroupNameLabel}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.usergroupGroupNamePlaceholder}
                  name={description.nameUserGroupsGroupName}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true, maxLength: 40 })}
                />
                {errors.groupname && (
                  <p>
                    <b>{description.errorUserGroupsGroupName}</b>
                  </p>
                )}
              </Col>
            </Form.Group>
            {/* -- Submit the Issue -- */}
            <Row className="justify-content-center">
              <CustomLink type="submit" value="Submit" />
            </Row>
            {requestState === true ? (
              <React.Fragment>
                <hr />
                <Row className="justify-content-left">
                  <p>
                    <b>Your request has been sent!</b>
                  </p>
                </Row>
                <Row className="justify-content-left">
                  <CustomLink
                    type="submit"
                    value="Back to Home Page"
                    onClick={handleHomepage}
                  />
                </Row>
              </React.Fragment>
            ) : (
              ""
            )}
          </Form>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
