using AutoMapper;

using SYNONYM.Model.Requests;

namespace SYNONYM.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<WordInsertRequest, Data.Word>()
                .ForMember(destination => destination.Text, opt => opt.MapFrom(source => source.Text.ToLower()));
            CreateMap<Data.Word, Model.Word>();

            CreateMap<Data.Node, Model.WordSynonyms>()
                .ForMember(destination => destination.Synonyms, opt => opt.MapFrom(source => source.AdjacentNodes));
        }
    }
}
