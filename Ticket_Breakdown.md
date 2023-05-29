
# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## TICKET-1

### Title
As a user, I want to list my agents

### Description
We need to enable a view for the users to see the list of agents they work with

**Implementation Details:**
- Create a function `getAgents` to get the list of agents the users are working with
- Create a view to listing all the agents
- Add  metadata to each agent in the table
    - Id
    - Name
    - Description
    - Any important field (TBD)

**Acceptance Criteria:**
- User enters the list of agents' view
- All the agents are listed in the table with their important metadata


## TICKET-2

### Title
As a User, I want to edit/add my custom agents ID

### Description
Inside the Agents list view,  create an agent detailed view modal with the selected agent metadata, and then enable a new input called Custom Agent ID so the users can add their own custom ID to the Agents they are working with

The field in the Agent Model:

	customAgentId: string;

**Implementation Details:**
- In the agent's list view, create a button to open a modal and load the agent data into the modal (See designs)
- List all the agent metadata in the modal and create an input field
    - label: Custom Agent ID
    - value: `customAgentId`
- Add cancel button to close the modal
- Add Save button to update Agent metadata in the database
- For now, all the rest of the metadata will be read-only

**Acceptance Criteria:**
- User enters the list of agents' view
- All the agents are listed in the table with their metadata
- User clicks on see detailed view for a specific Agent
- The user can add or edit the customAgentIf value
- On save the agent is updated and I can test it reloading the page

**Pre-conditions:**
- There must be an agent creation view, if not the user could change the default agent id generated internally by the Database

## TICKET-3

### Title
As I user I want to use the custom agent ID when generating reports

### Description
Currently, we are using the generated agent for generating reports, now we want to give the ability to user to choose if to use the customAgentId

**Implementation Details:**
- In generateReport view, in the list of shifts, inside agents metadata create a dropdown
    - label: Select the id you want to use
    - Options: agent ID and custom agent ID, the default will be agent ID
- Send `generateReport` with the data updated

**Acceptance Criteria:**
- User enters to generate report view
- User selected custom agent id
- User generates report with custom agent id
