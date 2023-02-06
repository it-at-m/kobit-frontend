/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2021
 */
package de.muenchen.kobit.filter;

import de.muenchen.kobit.ApiGatewayApplication;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;


@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = {ApiGatewayApplication.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
public class CsrfTokenAppendingHelperFilterTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    @WithMockUser
    public void csrfCookieAppendition() {
        webTestClient.get().uri("/").exchange().expectHeader()
                .valueMatches("set-cookie", "XSRF-TOKEN=[a-f\\d]{8}(-[a-f\\d]{4}){3}-[a-f\\d]{12}?;\\sPath=/");
    }

}

