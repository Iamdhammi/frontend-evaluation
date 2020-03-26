import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";

createTheme('solarized', {
    text: {
      primary: '#000',
      secondary: '#4667A7',
    },
    background: {
      default: 'transparent',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: 'rgba(196, 196, 196, 0.29)',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });
  
const customStyles = {
    headCells: {
      style: {
        paddingLeft: 20, // override the cell padding for head cells
        paddingRight: 20,
        background: '#e1e1e2',
        fontWeight: '800',
        fontSize: 13
      },
    }
};



const Circular = () => (
  <div style={{ padding: '24px', marginTop: 100 }}>
     <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
  </div>
);

  
export default function Datatable(props) {
    const data = props.stories;
    const [pending, setPending] = React.useState(true);

    React.useEffect(() => {
      if(props.stories){
        setPending(false);
      }
    }, [props.stories]);

const columns = [
  {
      name: 'Summary',
      selector: 'summary',
      sortable: true,
      format: row => `${row.summary.slice(0, 200)}...`,
      conditionalCellStyles: [
          {
              when: row => row.status === 'approved',
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status === 'rejected',
              style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status !== 'rejected' && row.status !== 'approved',
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
      ]
  },
  {
      name: 'Description',
      selector: 'description',
      sortable: true,
      format: row => `${row.description.slice(0, 200)}...`,
      conditionalCellStyles: [
          {
              when: row => row.status === 'approved',
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status === 'rejected',
              style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status !== 'rejected' && row.status !== 'approved',
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
      ]
  },
  {
      name: 'Type',
      selector: 'type',
      sortable: true,
      conditionalCellStyles: [
          {
              when: row => row.status === 'approved',
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status === 'rejected',
              style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status !== 'rejected' && row.status !== 'approved',
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
      ]
  },
  {
      name: 'Complexity',
      selector: 'complexity',
      sortable: true,
      conditionalCellStyles: [
          {
              when: row => row.status === 'approved',
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status === 'rejected',
              style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status !== 'rejected' && row.status !== 'approved',
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
      ]
  }, 
  {
      name: 'Estimated time',
      selector: 'estimatedHrs',
      sortable: true,
      conditionalCellStyles: [
          {
              when: row => row.status === 'approved',
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status === 'rejected',
              style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status !== 'rejected' && row.status !== 'approved',
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
      ]
  }, 
  {
      name: 'Cost',
      selector: 'cost',
      sortable: true,
      conditionalCellStyles: [
          {
              when: row => row.status === 'approved',
              style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status === 'rejected',
              style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          {
              when: row => row.status !== 'rejected' && row.status !== 'approved',
              style: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
          },
          
      ]
  }, 
];

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                theme="solarized"
                customStyles={customStyles}
                pagination
                noHeader
                defaultSortField="date"
                defaultSortAsc={false}
                progressPending={pending}
                progressComponent={<Circular />}
            />
        </div>
        
    );


}