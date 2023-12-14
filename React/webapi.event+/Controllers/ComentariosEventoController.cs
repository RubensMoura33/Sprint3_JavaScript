using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using webapi.event_.Domains;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentariosEventoController : ControllerBase
    {
        ComentariosEventoRepository comentario = new ComentariosEventoRepository();

        //Inicio da configuracao do Controller para IA

        //Armazena dados do servico da API externa (IA - Azure)
        private readonly ContentModeratorClient _contentModeratorClient;

        /// <summary>
        /// Construtor que recebe dados necessarios para acesso ao servico externo
        /// </summary>
        /// <param name="contentModeratorClient">Objeto do tipo ContentModeratorClient</param>
        public ComentariosEventoController(ContentModeratorClient contentModeratorClient)
        {
            _contentModeratorClient = contentModeratorClient;
        }

        [HttpPost("ComentarioIA")]
        public async Task<IActionResult> PostIA(ComentariosEvento novoComentario)
        {
            try
            {
                if((novoComentario.Descricao).IsNullOrEmpty())
                {
                    return BadRequest(" A descricao do comentario nao pode estar vazia ou nulo!");
                }

                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(novoComentario.Descricao));

                var moderationResult = await _contentModeratorClient.TextModeration.ScreenTextAsync("text/plain", stream, "por", false, false, null, true);

                if(moderationResult.Terms != null)
                {
                    novoComentario.Exibe = false;

                    comentario.Cadastrar(novoComentario);
                }

                else
                {
                    novoComentario.Exibe= true;

                    comentario.Cadastrar(novoComentario);
                }

                return StatusCode(201, novoComentario);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet("ListarSomenteExibe")]

        public IActionResult GetShow(Guid id)
        {
            try
            {
                return Ok(comentario.ListarSomenteExibe(id));
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try {
                return Ok(comentario.Listar()); 
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpGet("BuscarPorId")]

        public IActionResult Get(Guid idUsuario, Guid idEvento)
        {
            try { 
            return Ok(comentario.BuscarPorIdUsuario(idUsuario, idEvento));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]

        public IActionResult Post(ComentariosEvento novoComentario)
        {
            try
            {
                comentario.Cadastrar(novoComentario);
                return StatusCode(201, novoComentario);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        [HttpDelete("{id}")]

        public IActionResult Delete (Guid id)
        {
            try
            {
            comentario.Deletar(id);
            return StatusCode(204);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            
        }
    }

}
