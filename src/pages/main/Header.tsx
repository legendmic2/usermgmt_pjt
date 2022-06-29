import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

interface HeaderProps {
    title: string
}

export default function Header(props: HeaderProps) {
    const { title } = props

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button size="small">Main</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <Button variant="outlined" size="small">
                    Logout
                </Button>
            </Toolbar>
        </React.Fragment>
    )
}