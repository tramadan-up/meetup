import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import Filter5Icon from '@mui/icons-material/Filter5';
import Filter6Icon from '@mui/icons-material/Filter6';
import Filter7Icon from '@mui/icons-material/Filter7';
import Filter8Icon from '@mui/icons-material/Filter8';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const USER_TYPE_KEY = 'userType';

export default function IntroTextDisplay() {
    const handleClearSessionStorage = () => {
        sessionStorage.clear();
    };
    const [userType, setUserType] = useState(() => {
            const storedUserType = sessionStorage.getItem(USER_TYPE_KEY);
            return storedUserType ? JSON.parse(storedUserType) : true;
        });
    useEffect(() => {
        const syncUserType = () => {
            const storedUserType = sessionStorage.getItem(USER_TYPE_KEY);
            if (storedUserType !== null) {
                setUserType(JSON.parse(storedUserType));
            }
        };

        window.addEventListener('storage', syncUserType);
        return () => {
            window.removeEventListener('storage', syncUserType);
        };
    }, []);

    const toggleUserType = () => {
        const newValue = !userType;
        setUserType(newValue);
        sessionStorage.setItem(USER_TYPE_KEY, JSON.stringify(newValue));
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <Box sx={{
            border: '1px solid grey',
            borderRadius: '8px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Stack direction="column" spacing={3} sx={{ height: '90%', width:'75%', paddingTop: '2vh', paddingBottom: '2vh' }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4" textAlign={"center"}>Meeting App Prototyp</Typography>
                    <Typography variant="h5">Hinweis</Typography>
                    <Typography>Für eine schnelle Navigation im Test bietet der Prototyp einige rot vorgehobene Buttons. Falls du einen bestimmten Schritt bewusst überspringen möchtest, nutze diese um zwischen den Fenstern zu wechseln.
                    Zum Neustart des Meetings muss der Session Storage geleert werden, nutze hierfür den "Session Storage Löschen" Button auf der Loginseite.</Typography>
                    <Stack direction="row" spacing={2}>
                        <Typography variant="h5">Aufgaben</Typography>
                        <Button variant='outlined' onClick={toggleUserType} sx={{width: '25%'}}>{userType ? 'Koordinator/in' : 'Teilnehmer/in'}</Button>
                    </Stack>          
                    {userType ? (
                        <Box sx={{ 
                            border: '1px solid grey',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', 
                            maxHeight: '30vh', 
                            overflow:'auto'}}>
                            <List sx={{ maxHeight: '30vh', overflow:'auto'}}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter1Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Gleich soll dem Personal das neue Pausensystem vorgestellt werden. Bereite dazu ein 30 minütiges Meeting vor. Erstelle eine grobe Agenda und gib dem Meeting einen passenden Namen. Die Einleitung soll kurz und knapp gehalten werden, plane dafür höchstens 5 Minuten ein. Dann gehts weiter mit einer ausführlichen Vorstellung des Systems, etwa 10 Minuten, sowie eine kurze Diskussion. Abschließend soll es noch eine schnelle Fragerunde geben, 5 Minuten sollten dafür ausreichen. Da die Präsentation einen festen Zeitplan aufweist, sollen die Teilnehmer keine Zeittokens bekommen. Jeder Teilnehmer darf höchstens 1 Frage stellen, reduziere die Anzahl der Redetokens dafür auf 1.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter2Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Alle Teilnehmer sind nun beigetreten, starte das Meeting.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter3Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Das Meeting läuft erst 4 Minuten, Moritz hat aber bereits 3 Mal dazwischen geredet, verwarne ihn mit einem Straftoken. Mache dir eine kurze Notiz, um nach dem Meeting mit Moritz zu reden.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter4Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Die Einleitung ist vorbei, falls die Zeitscheibe noch läuft springe zum zweiten Thema. Wechsel zudem auf Folie 2. Auf den nächsten Folien steht eine umfangreiche Grafik des geplanten Systems. Da du diese nun ausgibig erklären willst, wechsle in den Vollbildmodus. Gehe nun bis zu Folie 4.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter5Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Verlasse den Vollbildmodus wieder und eröffne die Diskussionsrunde; gehe hierfür zur letzten Folie.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter6Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Es gibt eine kurze Unterbrechung, Moritz hat das Kabel vom Projektor rausgezogen. Pausiere das Meeting und verwarne ihn mit einem weiteren Straftoken. Danach wechsel zur Fragerunde und setzte das Meeting fort.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter7Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Beende das Meeting und sieh dir die Rückmeldungen der Teilnehmer an. Du hast dir während des Meetings ein paar Notizen gemacht, speichere diese ab, um sie später nochmal einzusehen.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter8Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Lade dir auch die Rückmeldungen herunter, um sie später auszuwerten.</ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                        ) : (
                            <Box sx={{ 
                                border: '1px solid grey', 
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', 
                                maxHeight: '30vh', 
                                overflow:'auto'}}>
                                <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter1Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Lies dir im Voting die geplanten Themen durch. Du bist der Meinung, dass Thema 4 viel zu wichtig ist, um als letztes besprochen zu werden. Schiebe es weiter nach oben und gib dein Voting ab.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter2Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Du hast das Meeting nun mehrmals unterbrochen und vom Koordinator eine Verwarnung in Form eines Straftokens bekommen (im Prototyp: "Straftoken simulieren"). Das senkt natürlich deinen Punktestand und damit deinen Platz im abschließenden Ranking. Mach dir eine kurze Notiz, in Zukunft weniger dazwischen zu reden.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter3Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Die Zeitscheibe des aktuellen Themas läuft aus, aber du möchtest noch etwas wichtiges sagen. Nutze eines deiner Zeittokens um die Zeit zu verlängern.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter4Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Da die aktuelle Folie eine komplexe Grafik zeigt wechsle in den Vollbildmodus. Nutze nun eines deiner Redetokens um einen kurzen Einwand zur Folie zu machen.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter5Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Gehe wieder aus dem Vollbildmodus raus und nutze ein weiteres Zeittoken. Leider ist aktuell keine Zeit mehr für eine weitere Zwischenfrage, notiere dir die Frage um sie beim nächsten Mal zu stellen.</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter6Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Das Meeting ist vorbei (Im Prototypen: "Meeting Beenden"). Schau dir deine benutzten Tokens und deinen Platz im Ranking an, hast du es in die Top drei geschafft?</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Filter7Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Der/die Koordinator/in hat seinen Job gut gemacht, gib ihm eine hohe Bewertung und schreib ihm einen positiven Kommentar. Gib dann deine Bewertung ab und lade dir abschließend noch deine Notizen herunter.</ListItemText>
                                </ListItem>
                            </List>
                        </Box>
                        )}
                </ThemeProvider>
                <Button variant='outlined' color='error' onClick={handleClearSessionStorage} sx={{width: '25%'}}>
                    Session storage löschen
                </Button>
            </Stack>
        </Box>
        
        /** 
        <Box sx={{ border: '1px solid grey', borderRadius: '8px', textAlign: 'left', p: 2, height: '75%', width: '75%', flex: 1, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="column" spacing={3} sx={{ height: '90%', width: '75%' }}>
                <Typography variant="h4" textAlign="center">Meeting App Prototyp</Typography>
                <Typography variant="h6">Rote Buttons dienen ausschließlich zum Navigieren und sind nicht Teil der App.</Typography>
                <Typography variant="h6">Erklärung/zusätzlicher Text</Typography>
                <Typography variant="h4">Code</Typography>
                <Typography variant="h6">Koordinator: 111</Typography>
                <Typography variant="h6">Teilnehmer: 666</Typography>
                <Button variant='outlined' color='error' onClick={handleClearSessionStorage} sx={{width: '25%'}}>
                    Session storage löschen
                    </Button>
            </Stack>
        </Box>
        */
    );
}
