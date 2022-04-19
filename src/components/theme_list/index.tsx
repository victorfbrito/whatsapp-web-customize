import React from 'react'

import themes from '../../store/themes_data.json'
import ThemeListItem from '../theme_list_item';

import * as sc from './styles'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <sc.Panel
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <>{children}</>
        )}
        </sc.Panel>
    );
}

function a11yProps(index: number) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

export default function ThemeList(
    // props: React.PropsWithChildren<{}>
    props: any
    ) {

    const [value, setValue] = React.useState(0);
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <sc.Container>
            <sc.Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"        
                textColor="secondary"
                indicatorColor="secondary"
            >
                <sc.Tab label="Gallery" {...a11yProps(0)} />
                <sc.Tab label="Animated" {...a11yProps(1)} />
            </sc.Tabs>
            <TabPanel value={value} index={0}>
                 <sc.List>
                    {themes.map((i, p) => 
                        <ThemeListItem data={i} doAction={() => props.chooseTheme(i)} key={p}/>
                    )}
                </sc.List>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <sc.List>
                    {themes.map((i, p) => 
                    <ThemeListItem data={i} doAction={() => props.chooseTheme(i)} key={p}/>

                )}
                </sc.List>
            </TabPanel>
        </sc.Container>
    )
}