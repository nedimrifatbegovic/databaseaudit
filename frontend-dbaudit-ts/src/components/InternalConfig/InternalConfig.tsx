import { Col, Form, Row } from "react-bootstrap";

import { CustomLink } from "../../style/CustomLink";
import { ExistingUser } from "../../assets/interfaces/Interfaces";
import { IInternalConfig } from "../../assets/interfaces/Interfaces";
import { Label } from "../../style/Label";
import React from "react";
import { description } from "./InternalConfig.resources";
import { paths } from "../../App/AppRouter.resources";
import { useForm } from "react-hook-form";

export default function InternalConfig(props: IInternalConfig) {
  const { register, handleSubmit, errors } = useForm();

  const getConfigNewData = (data: ExistingUser) => {
    console.log("I got the data", data);
  };

  return (
    <React.Fragment>
      {props.email !== undefined ? (
        // TODO: Check if there is a config for email "x..."
        // TODO: If YES enable edit of configuration
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
          <h1>{description.title}</h1>
          <hr />
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
              <Form.Label column>{description.privateKeyLabel}</Form.Label>
              <Col sm="10">
                <Form.Control
                  style={{ marginBottom: "2vh" }}
                  placeholder={description.privateKeyLabel}
                  name={description.namePrivatekey}
                  type="text"
                  maxLength={40}
                  ref={register({ required: true })}
                />
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
            <Row className="justify-content-md-center">
              <CustomLink type="submit" value="Submit" />
            </Row>
          </Form>
        </React.Fragment>
      ) : (
        <p>{description.loading}</p>
      )}
    </React.Fragment>
  );
}
