import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import { FC, useEffect, useState } from "react";
import { LoadingComponent } from "../../../components/LoadingComponent";
import { ClimbingEvent } from "../../../models/ClimbingEvent";
import { UserClimbingEvent } from "../../../models/UserClimbingEvent";
import { Sex } from "../../../models/UserData";


type Props = {
    event: ClimbingEvent,
    climbingEvents: UserClimbingEvent[]
}
type RowValues = {
    id: string,
    name: string,
    email: string,
    birthYear: number,
    category: string,
    sex: "K" | "M",
    section: string,
    sumOfPoints: number
}
export const ViewEventResultsComponent: FC<Props> = ({ event, climbingEvents }) => {

    const [values, setValues] = useState<RowValues[]>([]);
    useEffect(() => {
        const rows = climbingEvents.map<RowValues>(climbingEvent => {
            return {
                id: climbingEvent.userId,
                name: climbingEvent.name || "",
                email: climbingEvent.email || "",
                birthYear: climbingEvent.birthYear || 0,
                category: climbingEvent.category?.toString() || "",
                sex: "K",
                section: climbingEvent.isSection ? (climbingEvent.section ? climbingEvent.section : "TAK") : "Nie",
                sumOfPoints: climbingEvent.sumOfPoints
            }
        })
        setValues(rows);
    }, [climbingEvents])
    if (climbingEvents === undefined) return <LoadingComponent message="Pobieranie wyników..." />
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Imię i nazwisko' },
        { field: 'email', headerName: 'E-mail' },
        { field: 'birthYear', headerName: 'Rok', type: 'number' },
        {
            field: 'sex',
            headerName: 'Płeć',
            valueGetter: (params: GridValueGetterParams) => params.row.sex === Sex.FEMALE ? 'K' : 'M'
        },
        { field: 'category', headerName: 'Kategoria' },
        { field: 'section', headerName: 'Sekcja' },
        { field: 'sumOfPoints', headerName: 'Liczba punktów' },

    ];
    if (values.length === 0) return <LoadingComponent message="Pobieranie wyników..." />
    return (
        <Box>

            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    columnBuffer={8}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={{
                        toolbar: {

                            csvOptions: {
                                fileName: `wyniki-${event.name}-apka`,
                                delimiter: ';',
                                utf8WithBom: true,
                            }

                        }
                    }
                    }
                    rows={values}
                    columns={columns}
                    pageSize={20}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                />
            </div>
        </Box>
    )
}