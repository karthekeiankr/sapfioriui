sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project12/test/integration/FirstJourney',
		'project12/test/integration/pages/CustomersObjectPage',
		'project12/test/integration/pages/OrdersObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomersObjectPage, OrdersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project12') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomersObjectPage: CustomersObjectPage,
					onTheOrdersObjectPage: OrdersObjectPage
                }
            },
            opaJourney.run
        );
    }
);