import { Avatar, Divider, ListItemText, MenuItem, MenuList, Paper, Stack } from "@mui/material";

export default function MenuLayout({ children, userData }) {

    return <Stack direction="row">
        <Paper sx={{ width: 350, maxWidth: '100%', height: "100vh" }}>
            <MenuList>
                <Avatar alt="Remy Sharp" src={userData?.picture?.data?.url} sx={{margin:"auto"}}/>
                <MenuItem>
                    <ListItemText>Id: {userData?.id}</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Name: {userData?.name}</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>{userData?.email}</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
        <Stack p={2} sx={{ backgroundColor: "#c0c0c02b", width: "100%" }}>
            {children}
        </Stack>

    </Stack>
}