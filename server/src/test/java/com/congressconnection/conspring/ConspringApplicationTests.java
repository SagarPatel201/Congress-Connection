package com.congressconnection.conspring;
import static org.assertj.core.api.Assertions.assertThat;
import com.congressconnection.conspring.controller.BillController;
import com.congressconnection.conspring.controller.CongressmanController;
import com.congressconnection.conspring.controller.FavoritesController;
import com.congressconnection.conspring.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ConspringApplicationTests {

	@Autowired
	private BillController billController;
	@Autowired
	private CongressmanController congressmanController;
	@Autowired
	private FavoritesController favoritesController;
	@Autowired
	private UserController userController;

	@Test
	void contextLoads() {
		//Smoke Test
		assertThat(billController).isNotNull();
		assertThat(congressmanController).isNotNull();
		assertThat(favoritesController).isNotNull();
		assertThat(userController).isNotNull();
	}

}
