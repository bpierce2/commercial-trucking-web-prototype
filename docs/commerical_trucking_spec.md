# About
A proof of concept app where users can see equipment and commerical trucks that need to have condition reports submitted for delivieries and pickups. They can also search search delivieries and pickups that haven't had condition reports submitted yet. Once an equipment is selected they can upload info in a form and upload pictures to complete the submission report


# Architecture

- Purely for UI/UX prototyping, 
- all data will be stored in memory, 
- no external API calls, authentication.

# Pages

## Login Page
- username
- password
- branch
- submit button
- link "Need assistance?" (does nothing)

- Uses unique app layout that doesn't have header or bottom nav bar

## Home Page (Bottom Tab) /app/home
Displays 3 <HomeCard />

1. Equipment deliveries
    - Description: Complete condition report for equipment/commerical truck deliveries
    - On Click: navigate to /app/equipments?type=deliveries
2. Equipment pickups
    - Description: Complete condition reports for equipment/commerical truck pickups
    - On Click: navigate to /app/equipments?type=pickups
3. Equipment status
    - Description: Search for equipment status via scanning or equipment number
    - On Click: navigate to /app/search

### Home Page Card UI Hierarchy

<HomeCard>
    <Icon blue />  <Count blue />
    <Title large emphasized />
    <Description subtle />
</HomeCard>




## Equipment List Page (Type = Pickup or Delivery) /app/equipments?type=:type
- Display list of <EquipmentCard /> without the type badge
- On click navigate to the equipment detail page for that equipment

### Equipment Card UI Hierarchy

<EquipmentCard>
    <Image left-side-of-card />
    <Content>
        <NeedByTime light-gray />
        <EquipmentNumber large empahsized />
        <Description subtle />
    </Content>
    <TypeBadge top-left-of-card optional />
</EquipmentCard>


## Equipment Detail Page /app/equipments/:equipmentNumber
- Display <EquipmentDetailHeaderCard /> at top of page
- Fixed at bottom of page display primary button to "Add Condition Report" with a plus icon.
    - On click navigate to /app/equipments/condition-report/:equipmentNumber


### Equipment Detail Header UI Hierarchy

<EquipmentDetailHeaderCard>
    <Image left-side-of-card />
    <Content>
        <EquipmentNumber large empahsized />
        <Description subtle />
        <Branch light-gray semibold />
        <NeedByTime lighter-gray />
    </Content>
    <GPSIconButton top-left-of-card>Find</GPSIconButton>
</EquipmentDetailHeaderCard>


## Condition Report /app/equipments/condition-report/:equipmentNumber
- Display <EquipmentDetailHeaderCard /> at top of page
- Fixed at bottom of page is side by side Cancel (secondary) and Submit (primary) buttons
- Condition Report Form
    - Number Input "Hour Meter"
    - Equipment photos file inputs
- On successful submit navigate to /app/equipments/condition-report/success/:equipmentNumber


### Photo File Inputs
- Number of photo file inputs/layout varys based on the 'cat' field of an equipment.
    - Cat < 1000: Layout 1 -> 2 vertically stacked photo inputs
    - 1000 < cat < 2000: Layout 2 -> 3 row grid of inputs. first row has two inputs, middle row has one, last row has two inputs
    - 2000 < cat: Layout 3 -> List of 20 photo inputs


### Photo File UI
- If has file uploaded: bg, icons are green, otherwise red for no file
- whole card is drop zone for file input or clickable for dialog

<PhotoInputCard content-centered>
    <PhotoIcon />
    <PhotoLabel />
    {!hasFile && <Text>Tap to add photo</Text>}
    {hasFile && <Text>File name</Text>}
</PhotoInputCard>


## Condition Report Success /app/equipments/condition-report/success/:equipmentNumber
- Does not have page header
- Centered Card
- Button to navigate back to pickup or delivires list depdendent on equipment type

<ReportSuccessCard>
    <GreenCheckmarkIcon green-bg />
    <Title>Report Submitted Successfully</Title>
    <Description>Condition report for :equipmentNumber has been submitted successfully</Description>
    <Text>Submitted at {now datetime}</Text>
    <Button primary>Return to {deliveries|pickups}</Button>
</ReportSuccessCard>


## Search Page (Bottom Tab) /app/search
- search input with placeholder "Search equipment by number or scan..."
    - Should have button on right side in input for a scanner button (does nothing when pressed)
- If no results 
    - "Enter equipment number or scan to search" with icon
- If results
    - Display list of <EquipmentCard /> with type badge field enabled
    - On result click navigate to /app/equipments/:equipmentNumber
- Only searches equipment that haven't had condition report submitted yet



## Settings Page (Bottom Tab) /app/settings
- List of <ListOption />
    - Sync (Manually sync data with the server): Creates popup that disappears after one second with spinner. Doesn't do anything
    - Helpdesk (App Support): Dialog popup with title "Support user only", description "This password and login is for exclusive use by or under the direction of, authorized support personnel". A password input where the only valid value is "helpdesk" and then a cancel secondary button and "Accept and login" primary button". On success does nothing
    - Options (Light vs Dark mode): Dialog with toggle for light vs dark mode and done primary button
    - Language (Switch between languages): Dialog with radio options for english, spanish and german and done primary button. Doesn't actually do anything
    - About (App Info v2025.8.1): Dialog with property list for Rho Server, Branch Location, Theme, App culture (selected language), Device culture build date and done primary btuton.
    - Logout (Logs out the user): Logs user out


<ListOption flex>
    <Content flex-grow>
        <Title />
        <Description />
    </Content>
    <Icon />
</ListOption>


# App UI Shell
- Entirely designed for mobile viewports.
- Will have bottom tab bar that mimics what users would see in ios and android apps. The bottom bar should remain pinned to the bottom of the page
- Will have top header also similar to android and ios apps. All screens will have this header unless otherwise specified. The header should remain pinned to the top of the page
- Content should be sandwhiched between navbar and header.