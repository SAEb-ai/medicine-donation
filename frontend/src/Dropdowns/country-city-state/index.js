
import { Query } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import * as React from 'react';

export default function CountryDropdown() {
    // country DropDownList instance
    var countryObj;

    // state DropDownList instance
    var stateObj;

    // city DropDownList instance
    var cityObj;

    // define the country DropDownList data
    const countryData = [
        { CountryName: 'Australia', CountryId: '2' },
        { CountryName: 'United States', CountryId: '1' }
    ];

    // define the state DropDownList data
    const stateData = [
        { StateName: 'New York', CountryId: '1', StateId: '101' },
        { StateName: 'Virginia ', CountryId: '1', StateId: '102' },
        { StateName: 'Tasmania ', CountryId: '2', StateId: '105' }
    ];

    // define the city DropDownList data
    const cityData = [
        { CityName: 'Albany', StateId: '101', CityId: 201 },
        { CityName: 'Beacon ', StateId: '101', CityId: 202 },
        { CityName: 'Emporia', StateId: '102', CityId: 206 },
        { CityName: 'Hampton ', StateId: '102', CityId: 205 },
        { CityName: 'Hobart', StateId: '105', CityId: 213 },
        { CityName: 'Launceston ', StateId: '105', CityId: 214 }
    ];

    // maps the country column to fields property
    const countryField = { value: 'CountryId', text: 'CountryName' };

    // maps the state column to fields property
    const stateField = { value: 'StateId', text: 'StateName' };

    // maps the city column to fields property
    const cityField = { text: 'CityName', value: 'CityId' };

    function onCountryChange() {
        // query the data source based on country DropDownList selected value
        stateObj.query = new Query().where('CountryId', 'equal', countryObj.value);
        // enable the state DropDownList
        stateObj.enabled = true;
        // clear the existing selection.
        stateObj.text = null;
        // bind the property changes to state DropDownList
        stateObj.dataBind();
        // clear the existing selection in city DropDownList
        cityObj.text = null;
        // disable the city DropDownList
        cityObj.enabled = false;
        // bind the property change to City DropDownList
        cityObj.dataBind();
    }
    function onStateChange() {
        // query the data source based on state DropDownList selected value
        cityObj.query = new Query().where('StateId', 'equal', stateObj.value);
        // enable the city DropDownList
        cityObj.enabled = true;
        // clear the existing selection
        cityObj.text = null;
        // bind the property change to city DropDownList
        cityObj.dataBind();
    }

    return (
        <div>
            {/* specifies the tag for render the country DropDownList component */}
            <DropDownListComponent ref={(scope) => { countryObj = scope; }} fields={countryField} dataSource={countryData} placeholder='Select a country' change={onCountryChange = onCountryChange.bind()} />
            <br />

            {/* specifies the tag for render the state DropDownList component */}
            <DropDownListComponent id="state-ddl" ref={(scope) => { stateObj = scope; }} enabled={false} fields={stateField} dataSource={stateData} placeholder='Select a state' change={onStateChange = onStateChange.bind()} />
            <br />

            {/* specifies the tag for render the city DropDownList component */}
            <DropDownListComponent id="city-ddl" ref={(scope) => { cityObj = scope; }} enabled={false} fields={cityField} dataSource={cityData} placeholder='Select a city' />
        </div>
    );
}